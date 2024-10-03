import express from 'express';
import { createTicket, deleteTicket,updateTicket,viewTicket ,viewTicketByTicketId,viewTicketByEventId} from '../controller/ticketController.js';

const ticketRouter = express.Router();

ticketRouter.post("/createticket", createTicket);
ticketRouter.delete("/deleteticket/:ticketId/:eventId", deleteTicket);
ticketRouter.put("/updateticket/:eventId/:ticketId/:userId", updateTicket);
ticketRouter.get("/viewticket/:userId", viewTicket);
ticketRouter.get("/viewticketbyeventid/:eventId", viewTicketByEventId);
ticketRouter.get("/viewticketbyticketid/:ticketId", viewTicketByTicketId);


export default ticketRouter;