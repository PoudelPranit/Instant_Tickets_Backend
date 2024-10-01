import {create,deletee,update} from "../model/ticketModel.js";
 
export const createTicket = async (req,res) => {
    console.log("IN THE CONTROLLER");
    const {eventId, userId, ticketCount, ticketPrice ,totalAmount}= req.body;
    

    if (!eventId || !userId || !ticketCount || !ticketPrice|| !totalAmount){
        //console.log('Request body:', req.body);
        return res.status(403).json({message :"body not provided"});
    }
    try {
        const ticket = await create(eventId, userId, ticketCount, ticketPrice ,totalAmount);
        //console.log("I am here");
        return res.status(403).json({ticket});
        
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
        return res.status(403).json({ticket});
        
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
        //console.log("I am here");
        return res.status(403).json({ticket});
        
    } catch (error) {
        console.log(error);
    }
};