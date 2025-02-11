// src/index.ts
import './index.css';
import { ClockController } from './controllers/ClockController';

function createAddClockButton(): void {
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Clock';
    addBtn.className = 'add-clock-btn';
    addBtn.onclick = () => {
        const userInput = prompt('Enter timezone offset (e.g. 1 for GMT+1):', '1');
        if (userInput !== null) {
            const timeZoneOffset = parseInt(userInput) || 0;
            new ClockController(timeZoneOffset);
        }
    };
    document.body.appendChild(addBtn);
}

createAddClockButton();
new ClockController();
ClockController.startAll();