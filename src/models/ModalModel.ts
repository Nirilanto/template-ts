export class ModalModel {
    private isVisible: boolean = false;
    private timeZoneOffset: number = 1;

    public setVisibility(visible: boolean): void {
        this.isVisible = visible;
    }

    public getVisibility(): boolean {
        return this.isVisible;
    }

    public setTimeZoneOffset(offset: number): void {
        // Valider que l'offset est dans les limites acceptables
        if (offset >= -12 && offset <= 14) {
            this.timeZoneOffset = offset;
        }
    }

    public getTimeZoneOffset(): number {
        return this.timeZoneOffset;
    }

    public resetOffset(): void {
        this.timeZoneOffset = 1;
    }
}