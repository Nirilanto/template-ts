export interface ClockOptions {
    id: string;
    timeZoneOffset: number;
    onDelete: () => void;
}

export interface ClockState {
    hours: number;
    minutes: number;
    seconds: number;
    timeZoneOffset: number;
    is24HFormat: boolean;
    editMode: EditMode;
}

export enum EditMode {
    NONE,
    HOURS,
    MINUTES
}

export interface TimeFormat {
    timeValue: string;
    ampm?: string;
}