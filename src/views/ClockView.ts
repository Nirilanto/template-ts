import { EditMode } from "../types/types";

export class ClockView {
    private display: HTMLElement;
    private container: HTMLElement;
    private editingClass: string = 'editing';
    private backgroundColor: string = '#FBE106';
    private id: string;
    private timeZoneOffset: number;

    constructor(id: string, timeZoneOffset: number, onDelete: () => void) {
        this.id = id;
        this.timeZoneOffset = timeZoneOffset;
        this.initializeDOM(onDelete);
    }

    private initializeDOM(onDelete: () => void): void {
        let clocksGrid = document.querySelector('.clocks-grid');
        if (!clocksGrid) {
            clocksGrid = document.createElement('div');
            clocksGrid.className = 'clocks-grid';
            document.body.appendChild(clocksGrid);
        }
    
        this.container = document.createElement('div');
        this.container.className = 'clock-container';
        this.container.setAttribute('draggable', 'true');
        // Ajouter l'ID au container
        this.container.id = `clock-container-${this.id}`;
    
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
            e.dataTransfer?.setData('text/plain', this.container.id);
            this.container.classList.add('dragging');
        });
    
        this.container.addEventListener('dragend', () => {
            this.container.classList.remove('dragging');
            document.querySelectorAll('.clock-container').forEach(container => {
                container.classList.remove('drag-over');
            });
        });
    
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!this.container.classList.contains('dragging')) {
                this.container.classList.add('drag-over');
            }
        });
    
        this.container.addEventListener('dragleave', () => {
            this.container.classList.remove('drag-over');
        });
    
        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedElementId = e.dataTransfer?.getData('text/plain');
            const draggedElement = document.getElementById(draggedElementId);
            
            if (draggedElement && draggedElement !== this.container) {
                const parent = this.container.parentNode;
                
                if (parent) {
                    // Obtenir l'index des éléments
                    const children = Array.from(parent.children);
                    const draggedIndex = children.indexOf(draggedElement);
                    const dropIndex = children.indexOf(this.container);
                    
                    if (draggedIndex > dropIndex) {
                        parent.insertBefore(draggedElement, this.container);
                    } else {
                        parent.insertBefore(draggedElement, this.container.nextSibling);
                    }
                }
            }
            
            document.querySelectorAll('.clock-container').forEach(container => {
                container.classList.remove('drag-over');
            });
        });
    }
    
    public updateDisplay(time: string, editMode: EditMode): void {
        const [timeValue, ampm] = time.split(' ');
        const [hours, minutes, seconds] = timeValue.split(':');
        
        // Créer un span pour l'information de la zone horaire
        const zoneInfo = `<div class="timezone-info">GMT ${this.timeZoneOffset >= 0 ? '+' : ''}${this.timeZoneOffset}</div>`;
        
        this.display.innerHTML = `
            <div class="time-display">
                <span class="${editMode === EditMode.HOURS ? 'editing' : ''}">${hours}</span>:
                <span class="${editMode === EditMode.MINUTES ? 'editing' : ''}">${minutes}</span>:
                <span>${seconds}</span>
                ${ampm ? `<span class="ampm">${ampm}</span>` : ''}
            </div>
            ${zoneInfo}
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
        this.display.style.color = this.backgroundColor === '#FBE106' ? '#FFFFFF' : '#FBE106';
        this.display.style.backgroundColor = this.backgroundColor;
    }

    public getId(): string {
        return this.id;
    }
}