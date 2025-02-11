// src/models/ClockModel.ts
import { ClockState, EditMode, TimeFormat } from '../types/types';

export class ClockModel {
    private state: ClockState;

    constructor(timeZoneOffset: number = 1) {
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            timeZoneOffset,
            is24HFormat: true,
            editMode: EditMode.NONE
        };
        this.resetTime();
    }

    public resetTime(): void {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const newTime: Date = new Date(utc + (3600000 * this.state.timeZoneOffset));
        this.state.hours = newTime.getHours();
        this.state.minutes = newTime.getMinutes();
        this.state.seconds = newTime.getSeconds();
    }

    private formatTimeValue(hours: number, minutes: number, seconds: number): TimeFormat {
        if (this.state.is24HFormat) {
            return {
                timeValue: `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`
            };
        }
        const hours12: number = hours % 12 || 12;
        const ampm: string = hours < 12 ? 'AM' : 'PM';
        return {
            timeValue: `${this.padZero(hours12)}:${this.padZero(minutes)}:${this.padZero(seconds)}`,
            ampm
        };
    }


    public getTime(): string {
        const { timeValue, ampm } = this.formatTimeValue(
            this.state.hours,
            this.state.minutes,
            this.state.seconds
        );
        return ampm ? `${timeValue} ${ampm}` : timeValue;
    }

    private padZero(num: number): string {
        return num.toString().padStart(2, '0');
    }

    public updateTime(): void {
        this.state.seconds = (this.state.seconds + 1) % 60;
        if (this.state.seconds === 0) {
            this.state.minutes = (this.state.minutes + 1) % 60;
            if (this.state.minutes === 0) {
                this.state.hours = (this.state.hours + 1) % 24;
            }
        }
    }


    public incrementHours(): void {
        this.state.hours = (this.state.hours + 1) % 24;
    }

    public incrementMinutes(): void {
        this.state.minutes = (this.state.minutes + 1) % 60;
        if (this.state.minutes === 0) {
            this.incrementHours();
        }
    }

    public toggleTimeFormat(): void {
        this.state.is24HFormat = !this.state.is24HFormat;
    }

    public getEditMode(): EditMode {
        return this.state.editMode;
    }

    public setEditMode(mode: EditMode): void {
        this.state.editMode = mode;
    }
}