import { Router } from "express";
import {
  getEvents,
  getEventById,
  getAvailableEvents,
  getMyEvents,
  createEvent,
  updateEvent,
  registerToEvent,
  unregisterToEvent
} from "../controllers/event.controller.js";

const router = Router();

router.get('', getEvents);
router.get('/info', getEventById);
router.get('/available', getAvailableEvents);
router.get('/registered', getMyEvents);
router.post('/create', createEvent);
router.put('/update', updateEvent);
router.post('/register', registerToEvent);
router.delete('/unregister', unregisterToEvent);

export default router;