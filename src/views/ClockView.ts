// src/views/ClockView.ts
import { EditMode } from '../models/EditMode';

export class ClockView {
    private display: HTMLElement;
    private editingClass: string = 'editing';
    private backgroundColor: string = '#FBE106';

    constructor() {
        this.initializeDOM();
    }

    private initializeDOM(): void {
        this.display = document.createElement('div');
        this.display.className = 'clock';
        this.display.style.backgroundColor = this.backgroundColor;

        const container = document.createElement('div');
        container.className = 'clock-container';
        container.appendChild(this.display);

        const buttons = this.createButtons();
        container.appendChild(buttons);

        document.body.appendChild(container);
    }

    private createButtons(): HTMLElement {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons';

        const modeBtn = document.createElement('button');
        modeBtn.textContent = 'Mode';
        modeBtn.id = 'mode-btn';

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = 'Increase';
        increaseBtn.id = 'increase-btn';

        const lightBtn = document.createElement('button');
        lightBtn.textContent = 'Light';
        lightBtn.id = 'light-btn';

        buttonsContainer.append(modeBtn, increaseBtn, lightBtn);
        return buttonsContainer;
    }

    public updateDisplay(time: string, editMode: EditMode): void {
        const [hours, minutes, seconds] = time.split(':');
        this.display.innerHTML = `
            <span class="${editMode === EditMode.HOURS ? 'editing' : ''}">${hours}</span>:
            <span class="${editMode === EditMode.MINUTES ? 'editing' : ''}">${minutes}</span>:
            <span>${seconds}</span>
        `;
    }

    public setEditMode(mode: EditMode): void {
        this.display.classList.remove(this.editingClass);
        if (mode !== EditMode.NONE) {
            //this.display.classList.add(this.editingClass);
        }
    }

    public toggleBackground(): void {
        this.backgroundColor = this.backgroundColor === '#FBE106' ? '#FFFFFF' : '#FBE106';
        this.display.style.backgroundColor = this.backgroundColor;
    }
}