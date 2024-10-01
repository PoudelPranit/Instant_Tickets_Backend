import express from 'express';
import { createTicket, deleteTicket,updateTicket } from '../controller/ticketController.js';

const ticketRouter = express.Router();

ticketRouter.post("/createticket", createTicket);
ticketRouter.delete("/deleteticket/:ticketId/:eventId", deleteTicket);
ticketRouter.put("/updateticket/:eventId/:ticketId/:userId", updateTicket);

export default ticketRouter;