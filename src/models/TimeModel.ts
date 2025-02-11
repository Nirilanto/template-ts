// src/models/TimeModel.ts
import { EditMode } from './EditMode';

export class TimeModel {
    private hours: number = 0;
    private minutes: number = 0;
    private seconds: number = 0;
    private editMode: EditMode = EditMode.NONE;

    constructor() {
        const now = new Date();
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
    }

    public getTime(): string {
        return `${this.padZero(this.hours)}:${this.padZero(this.minutes)}:${this.padZero(this.seconds)}`;
    }

    private padZero(num: number): string {
        return num.toString().padStart(2, '0');
    }

    public updateTime(): void {
        const now = new Date();
        this.seconds = now.getSeconds();
        if (this.editMode === EditMode.NONE) {
            this.minutes = now.getMinutes();
            this.hours = now.getHours();
        }
    }

    public incrementHours(): void {
        this.hours = (this.hours + 1) % 24;
    }

    public incrementMinutes(): void {
        this.minutes = (this.minutes + 1) % 60;
        if (this.minutes === 0) {
            this.incrementHours();
        }
    }

    public getEditMode(): EditMode {
        return this.editMode;
    }

    public setEditMode(mode: EditMode): void {
        this.editMode = mode;
    }
}