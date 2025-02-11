// src/index.ts
import './index.css';
import { TimeModel } from './models/TimeModel';
import { ClockView } from './views/ClockView';
import { ClockController } from './controllers/ClockController';

const model = new TimeModel();
const view = new ClockView();
const controller = new ClockController(model, view);
controller.start();