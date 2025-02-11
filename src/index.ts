import './index.css';
import { ClockController } from './controllers/ClockController';
import { ModalController } from './controllers/ModalController';
import { ThemeController } from './controllers/ThemeController';

function createAddClockButton(): void {
    new ThemeController();
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
new ThemeController(); // Initialise le contrôleur de thème
createAddClockButton();
new ClockController();
ClockController.startAll();