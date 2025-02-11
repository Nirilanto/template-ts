// src/models/TimeModel.ts
import { EditMode } from './EditMode';

export class TimeModel {
    private hours: number = 0;
    private minutes: number = 0;
    private seconds: number = 0;
    private editMode: EditMode = EditMode.NONE;
    private updateInProgress: boolean = false;
    private timeZoneOffset: number = 0;
    private is24HFormat: boolean = true;

    constructor(timeZoneOffset: number = 0) {
        this.timeZoneOffset = timeZoneOffset;
        this.resetTime();
    }

    public resetTime(): void {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const newTime = new Date(utc + (3600000 * this.timeZoneOffset));
        this.hours = newTime.getHours();
        this.minutes = newTime.getMinutes();
        this.seconds = newTime.getSeconds();
    }

    public getTime(): string {
        if (this.is24HFormat) {
            return `${this.padZero(this.hours)}:${this.padZero(this.minutes)}:${this.padZero(this.seconds)}`;
        }
        const hours12 = this.hours % 12 || 12;
        const ampm = this.hours < 12 ? 'AM' : 'PM';
        return `${this.padZero(hours12)}:${this.padZero(this.minutes)}:${this.padZero(this.seconds)} ${ampm}`;
    }

    private padZero(num: number): string {
        return num.toString().padStart(2, '0');
    }

    public updateTime(): void {
        if (this.updateInProgress) return;
        
        this.updateInProgress = true;
        this.seconds = (this.seconds + 1) % 60;
        
        if (this.seconds === 0) {
            this.minutes = (this.minutes + 1) % 60;
            if (this.minutes === 0) {
                this.hours = (this.hours + 1) % 24;
            }
        }
        this.updateInProgress = false;
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

    public toggleTimeFormat(): void {
        this.is24HFormat = !this.is24HFormat;
    }

    public getEditMode(): EditMode {
        return this.editMode;
    }

    public setEditMode(mode: EditMode): void {
        this.editMode = mode;
    }
}