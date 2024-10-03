import express from 'express';
import { createEvent, deleteEvent, updateEvent,getAllEvent} from '../controller/eventController.js';

const eventRouter = express.Router();

eventRouter.post("/createevent", createEvent);
eventRouter.put("/updateevent/:id", updateEvent);
eventRouter.delete("/deleteevent/:id", deleteEvent);
eventRouter.get("/viewallevent", getAllEvent);

export default eventRouter;