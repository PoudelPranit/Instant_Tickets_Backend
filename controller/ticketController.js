import {create,deletee,update,view,viewbyticketid,viewticketbyeventid} from "../model/ticketModel.js";
 
export const createTicket = async (req,res) => {
    console.log("IN THE CONTROLLER");
    const {eventId, userId, ticketCount, ticketPrice ,totalAmount}= req.body;
    

    if (!eventId || !userId || !ticketCount || !ticketPrice|| !totalAmount){
        //console.log('Request body:', req.body);
        return res.status(403).json({message :"body not provided"});
    }
    //if (parseInt(ticketCount)>)
    try {
        const ticket = await create(eventId, userId, ticketCount, ticketPrice ,totalAmount);
        //console.log("I am here");
        return res.status(200).json({ticket});
        
    } catch (error) {
        console.log(error);
    }
};


export const deleteTicket = async (req,res) => {
    console.log("IN THE CONTROLLER");
    const { eventId, ticketId } = req.params;
    console.log(ticketId,eventId)
    if (!eventId || !ticketId){
        //console.log('Request body:', req.body);
        return res.status(403).json({message :"id not provided"});
    }
    try {
        const ticket = await deletee(ticketId, eventId);
        //console.log("I am here");
        return res.status(200).json({ticket});
        
    } catch (error) {
        console.log(error);
    }
};

export const updateTicket = async (req,res) => {
    console.log("IN THE CONTROLLER");
    const {eventId, ticketId, userId} = req.params;
    const {updatedTicketCount} = req.body;
    console.log(ticketId,eventId, userId)
    console.log(updatedTicketCount);
    if (!eventId || !ticketId || !userId){
        //console.log('Request body:', req.body);
        return res.status(403).json({message :"id not provided"});
    }
    try {
        const ticket = await update(eventId, ticketId, userId, updatedTicketCount);
        if (ticket.status === false) {
            console.log( ticket.message);
            return res.status(400).json({ message: ticket.message });
        }
        return res.status(200).json({ message: "success",ticket });
        
    } catch (error) {
        console.log(error);
    }
};

export const viewTicket = async (req, res) => {
    const{userId} = req.params;
    try {
        // Assuming deleteEventById is a function that deletes the event from the database
        const ticketHistory = await view(userId);

        if (!ticketHistory) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res.status(200).json({ ticketHistory});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while deleting the event" });
    }
};

export const viewTicketByTicketId = async (req, res) => {
    const{ticketId} = req.params;
    console.log(ticketId, "ok");
    try {
        
        // Assuming deleteEventById is a function that deletes the event from the database
        const viewticket = await viewbyticketid(ticketId);

        if (!viewticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        return res.status(200).json({ viewticket});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while deleting the event" });
    }
};

export const viewTicketByEventId = async (req, res) => {
    const{eventId} = req.params;
    console.log(eventId, "ok");
    try {
        
        // Assuming deleteEventById is a function that deletes the event from the database
        const viewticket = await viewticketbyeventid(eventId);
        console.log(viewticket);
        if (!viewticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        return res.status(200).json({ viewticket});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while deleting the event" });
    }
};

