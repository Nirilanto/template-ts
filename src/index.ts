import './index.css';
import { ClockController } from './controllers/ClockController';
import { ModalController } from './controllers/ModalController';

function createAddClockButton(): void {
    const modalController = new ModalController();
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Clock';
    addBtn.className = 'add-clock-btn';
    
    addBtn.onclick = () => {
        modalController.show((timeZoneOffset: number) => {
            new ClockController(timeZoneOffset);
        });
    };
    
    document.body.appendChild(addBtn);
}

// Initialize the application
createAddClockButton();
new ClockController();
ClockController.startAll();