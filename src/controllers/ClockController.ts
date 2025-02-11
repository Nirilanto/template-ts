// src/controllers/ClockController.ts
import { TimeModel } from '../models/TimeModel';
import { ClockView } from '../views/ClockView';
import { EditMode } from '../models/EditMode';

export class ClockController {
    private model: TimeModel;
    private view: ClockView;
    private intervalId: number | null = null;

    constructor(model: TimeModel, view: ClockView) {
        this.model = model;
        this.view = view;
        this.bindEvents();
    }

    private bindEvents(): void {
        document.getElementById('mode-btn')?.addEventListener('click', () => this.handleModeButton());
        document.getElementById('increase-btn')?.addEventListener('click', () => this.handleIncreaseButton());
        document.getElementById('light-btn')?.addEventListener('click', () => this.handleLightButton());
    }

    public handleModeButton(): void {
        const currentMode = this.model.getEditMode();
        let newMode: EditMode;

        switch (currentMode) {
            case EditMode.NONE:
                newMode = EditMode.HOURS;
                break;
            case EditMode.HOURS:
                newMode = EditMode.MINUTES;
                break;
            default:
                newMode = EditMode.NONE;
        }

        this.model.setEditMode(newMode);
        this.view.setEditMode(newMode);
    }

    public handleIncreaseButton(): void {
        const currentMode = this.model.getEditMode();
        if (currentMode === EditMode.HOURS) {
            this.model.incrementHours();
        } else if (currentMode === EditMode.MINUTES) {
            this.model.incrementMinutes();
        }
    }

    public handleLightButton(): void {
        this.view.toggleBackground();
    }

    public start(): void {
        this.intervalId = window.setInterval(() => {
            this.model.updateTime();
            this.view.updateDisplay(this.model.getTime());
        }, 1000);
    }
}