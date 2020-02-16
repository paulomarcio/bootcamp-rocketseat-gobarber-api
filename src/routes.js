import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

// Importing controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AvailableController from './app/controllers/AvailableController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

// Importing middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Session routes
routes.post('/sessions', SessionController.store);

// User routes
routes.post('/users', UserController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

// Provider routes
routes.get('/providers', ProviderController.index);
routes.get('/providers/:id/available', AvailableController.index);

// Appointment routes
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// Schedule routes
routes.get('/schedule', ScheduleController.index);

// Notification routes
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Files routes
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
