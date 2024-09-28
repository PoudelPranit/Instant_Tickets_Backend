import express from 'express';
import { createTicket, deleteTicket } from '../controller/ticketController.js';

const ticketRouter = express.Router();

ticketRouter.post("/createticket", createTicket);
ticketRouter.delete("/deleteticket/:ticketId/:eventId", deleteTicket);

export default ticketRouter;