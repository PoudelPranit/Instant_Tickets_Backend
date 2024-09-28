import {create,update,deletee} from "../model/eventModel.js";
 
export const createEvent = async (req,res) => {
    console.log("IN THE CONTROLLER");
    const {performer, venue, date, time, ticketCount, price}= req.body;
    

    if (!performer || !venue || !date || !time|| !ticketCount || !price){
        //console.log('Request body:', req.body);
        return res.status(403).json({message :"body not provided"});
    }
    try {
        const event = await create(performer, venue, date, time, ticketCount, price);
        //console.log("I am here");
        return res.status(403).json({event});
        
    } catch (error) {
        console.log(error);
    }
};

export const updateEvent = async (req, res) => {
   // console.log("I am here");
   const { id } = req.params;
    const { performer, venue, date, time, ticketCount, price} = req.body;
   // console.log("ID",req.params);
   // console.log("ID",id);
    //console.log("BODY",req.body);

    if (!id || !performer || !venue || !date || !time || !ticketCount || !price) {
        return res.status(403).json({ message: "Required fields are missing" });
    }

    try {
        // Assuming updateUserById is a function to update the user in the database
        const updatedEvent = await update(id, {
            performer,
            venue,
            date,
            time,
            ticketCount,
            price,
        });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ user: updatedEvent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while updating the Event" });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    // Check if event ID is provided
    if (!id) {
        return res.status(403).json({ message: "Event ID is missing" });
    }

    try {
        // Assuming deleteEventById is a function that deletes the event from the database
        const deletedEvent = await deletee(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while deleting the event" });
    }
};



