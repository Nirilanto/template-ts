import { ModalModel } from '../models/ModalModel';
import { ModalView } from '../views/ModalView';

export class ModalController {
    private model: ModalModel;
    private view: ModalView;
    private onConfirmCallback?: (value: number) => void;

    constructor() {
        this.model = new ModalModel();
        this.view = new ModalView();
        this.bindEvents();
    }

    private bindEvents(): void {
        // Gérer le clic sur l'overlay
        this.view.onOverlayClick((e: MouseEvent) => {
            if (e.target === this.view.getOverlayElement()) {
                this.hide();
            }
        });

        // Gérer les clics sur les boutons
        this.view.onContentClick((e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const action = target.getAttribute('data-action');

            if (action === 'cancel') {
                this.hide();
            } else if (action === 'confirm') {
                this.handleConfirm();
            }
        });

        // Gérer la touche Escape
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.model.getVisibility()) {
                this.hide();
            }
        });
    }

    private handleConfirm(): void {
        const offset = this.view.getInputValue();
        this.model.setTimeZoneOffset(offset);
        
        if (this.onConfirmCallback) {
            this.onConfirmCallback(this.model.getTimeZoneOffset());
        }
        
        this.hide();
    }

    public show(callback: (value: number) => void): void {
        this.onConfirmCallback = callback;
        this.model.setVisibility(true);
        this.view.setVisibility(true);
    }

    public hide(): void {
        this.model.setVisibility(false);
        this.view.setVisibility(false);
        this.model.resetOffset();
        this.view.resetInput();
    }
}