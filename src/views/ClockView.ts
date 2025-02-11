import { EditMode } from '../models/EditMode';

export class ClockView {
    private display: HTMLElement;
    private container: HTMLElement;
    private editingClass: string = 'editing';
    private backgroundColor: string = '#FBE106';
    private id: string;

    constructor(id: string, onDelete: () => void) {
        this.id = id;
        this.initializeDOM(onDelete);
    }

    private initializeDOM(onDelete: () => void): void {
        // Trouver ou créer la grille
        let clocksGrid = document.querySelector('.clocks-grid');
        if (!clocksGrid) {
            clocksGrid = document.createElement('div');
            clocksGrid.className = 'clocks-grid';
            document.body.appendChild(clocksGrid);
        }
    
        this.container = document.createElement('div');
        this.container.className = 'clock-container';
        this.container.setAttribute('draggable', 'true');
    
        this.display = document.createElement('div');
        this.display.className = 'clock';
    
        const buttons = this.createButtons(onDelete);
        this.container.append(this.display, buttons);
    
        clocksGrid.appendChild(this.container);
        this.setupDragAndDrop();
    }

    private createButtons(onDelete: () => void): HTMLElement {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons';

        const modeBtn = document.createElement('button');
        modeBtn.textContent = 'Mode';
        modeBtn.id = `mode-btn-${this.id}`;

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = 'Increase';
        increaseBtn.id = `increase-btn-${this.id}`;

        const lightBtn = document.createElement('button');
        lightBtn.textContent = 'Light';
        lightBtn.id = `light-btn-${this.id}`;

        const formatBtn = document.createElement('button');
        formatBtn.textContent = 'Format';
        formatBtn.id = `format-btn-${this.id}`;

        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';
        resetBtn.id = `reset-btn-${this.id}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.id = `delete-btn-${this.id}`;
        deleteBtn.onclick = onDelete;

        buttonsContainer.append(modeBtn, increaseBtn, lightBtn, formatBtn, resetBtn, deleteBtn);
        return buttonsContainer;
    }

    private setupDragAndDrop(): void {
        this.container.addEventListener('dragstart', (e) => {
            e.dataTransfer?.setData('text/plain', this.id);
            this.container.classList.add('dragging');
        });

        this.container.addEventListener('dragend', () => {
            this.container.classList.remove('dragging');
        });

        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.container.classList.add('dragover');
        });

        this.container.addEventListener('dragleave', () => {
            this.container.classList.remove('dragover');
        });

        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            this.container.classList.remove('dragover');
            const draggedId = e.dataTransfer?.getData('text/plain');
            if (draggedId && draggedId !== this.id) {
                this.swapPositions(draggedId);
            }
        });
    }

    private swapPositions(otherId: string): void {
        const otherClock = document.querySelector(`[id*="${otherId}"]`)?.closest('.clock-container');
        if (otherClock && this.container.parentNode) {
            const clone = this.container.cloneNode(true);
            otherClock.replaceWith(this.container);
            this.container.replaceWith(otherClock);
        }
    }

    public updateDisplay(time: string, editMode: EditMode): void {
        const [timeValue, ampm] = time.split(' ');
        const [hours, minutes, seconds] = timeValue.split(':');
        
        this.display.innerHTML = `
            <span class="${editMode === EditMode.HOURS ? 'editing' : ''}">${hours}</span>:
            <span class="${editMode === EditMode.MINUTES ? 'editing' : ''}">${minutes}</span>:
            <span>${seconds}</span>
            ${ampm ? `<span class="ampm">${ampm}</span>` : ''}
        `;
    }

    public remove(): void {
        this.container.remove();
    }

    public setEditMode(mode: EditMode): void {
        this.display.classList.remove(this.editingClass);
        if (mode !== EditMode.NONE) {
        //  this.display.classList.add(this.editingClass);
        }
    }

    public toggleBackground(): void {
        this.backgroundColor = this.backgroundColor === '#FBE106' ? '#FFFFFF' : '#FBE106';
        this.display.style.backgroundColor = this.backgroundColor;
    }

    public getId(): string {
        return this.id;
    }
}
