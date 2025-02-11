import { ClockModel } from '../models/ClockModel';
import { EditMode } from '../types/types';
import { ClockView } from '../views/ClockView';

export class ClockController {
    private model: ClockModel;
    private view: ClockView;
    private static intervalId: number | null = null;
    private static clocks: ClockController[] = [];

    constructor(timeZoneOffset: number = 0) {
        this.model = new ClockModel(timeZoneOffset);
        this.view = new ClockView(crypto.randomUUID(), timeZoneOffset, () => this.destroy());
        this.bindEvents();
        ClockController.clocks.push(this);
    }

    private bindEvents(): void {
        const id = this.view.getId();
        document.getElementById(`mode-btn-${id}`)?.addEventListener('click', () => this.handleModeButton());
        document.getElementById(`increase-btn-${id}`)?.addEventListener('click', () => this.handleIncreaseButton());
        document.getElementById(`light-btn-${id}`)?.addEventListener('click', () => this.handleLightButton());
        document.getElementById(`format-btn-${id}`)?.addEventListener('click', () => this.handleFormatButton());
        document.getElementById(`reset-btn-${id}`)?.addEventListener('click', () => this.handleResetButton());
    }

    public static startAll(): void {
        if (this.intervalId === null) {
            this.intervalId = window.setInterval(() => {
                this.clocks.forEach(clock => {
                    clock.model.updateTime();
                    clock.view.updateDisplay(clock.model.getTime(), clock.model.getEditMode());
                });
            }, 1000);
        }
    }

    private destroy(): void {
        const index = ClockController.clocks.indexOf(this);
        if (index > -1) {
            ClockController.clocks.splice(index, 1);
            this.view.remove();
        }
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

    public handleFormatButton(): void {
        this.model.toggleTimeFormat();
    }

    public handleResetButton(): void {
        this.model.resetTime();
    }
}
