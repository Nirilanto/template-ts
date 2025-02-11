export class ModalView {
    private modalOverlay: HTMLElement;
    private modalContent: HTMLElement;
    private input: HTMLInputElement;

    constructor() {
        this.initializeDOM();
    }

    private initializeDOM(): void {
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = 'modal-overlay';

        this.modalContent = document.createElement('div');
        this.modalContent.className = 'modal-content';

        this.modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">Add New Clock</h2>
            </div>
            <div class="modal-body">
                <label for="timezone-input">Timezone offset (e.g. 1 for GMT+1)</label>
                <input type="number" 
                       id="timezone-input" 
                       class="modal-input" 
                       value="1" 
                       min="-12" 
                       max="14"
                       step="1">
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-secondary" data-action="cancel">Cancel</button>
                <button class="modal-btn modal-btn-primary" data-action="confirm">Add Clock</button>
            </div>
        `;

        this.modalOverlay.appendChild(this.modalContent);
        document.body.appendChild(this.modalOverlay);

        this.input = this.modalContent.querySelector('#timezone-input') as HTMLInputElement;
    }

    public setVisibility(visible: boolean): void {
        if (visible) {
            this.modalOverlay.classList.add('active');
            this.input.focus();
        } else {
            this.modalOverlay.classList.remove('active');
        }
    }

    public getInputValue(): number {
        return parseInt(this.input.value) || 0;
    }

    public resetInput(): void {
        this.input.value = '1';
    }

    public onOverlayClick(callback: (event: MouseEvent) => void): void {
        this.modalOverlay.addEventListener('click', callback);
    }

    public onContentClick(callback: (event: MouseEvent) => void): void {
        this.modalContent.addEventListener('click', callback);
    }

    public getOverlayElement(): HTMLElement {
        return this.modalOverlay;
    }
}