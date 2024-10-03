import { connectToDatabase } from '../database/database.js';
import { ObjectId } from 'mongodb'; // Make sure ObjectId is imported



export const create = async (eventId, userId, ticketCount, ticketPrice, totalAmount) => {
    try {
        console.log('i AM HERE');
        // Connect to the database and get the user collection
        const { ticketCollection } = await connectToDatabase();
        const { eventCollection } = await connectToDatabase();

        // Create a new user document
        const newTicket = {
            eventId,
            userId,
            ticketCount,
            ticketPrice,
            totalAmount
        };

        
        const objectId = new ObjectId(eventId);

        // Insert the new user into the Users collection
        const result = await ticketCollection.insertOne(newTicket);
        const currentEvent = await eventCollection.findOne({ _id: objectId });
        const updatedTicketCount = currentEvent.ticketCount - ticketCount;
        console.log(eventId);
        console.log(updatedTicketCount);
        await eventCollection.updateOne(
            { _id: objectId },  // Find the event by its ID
            { $set: { ticketCount: updatedTicketCount } }
        );
        console.log( result);
        return result;
    } catch (error) {
        console.error('Error occurred while creating Ticket:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};


export const update = async (eventId, ticketId, userId, updatedTicketCount) => {
    console.log("I am here");
    console.log("ID", eventId, ticketId, userId);

    try {
        // Connect to the database and get the user collection
        const { eventCollection } = await connectToDatabase();
        const { ticketCollection } = await connectToDatabase();

        // Ensure userId is a valid ObjectId (if using MongoDB)
        const event_objectId = new ObjectId(eventId);
        const ticket_objectId = new ObjectId(ticketId);

        const currentEvent = await eventCollection.findOne({ _id: event_objectId });
        const currentTicket = await ticketCollection.findOne({ _id: ticket_objectId });
        console.log ("current ticket count in ticket",parseInt(currentTicket.ticketCount ));
        console.log ("current ticket count in event ",parseInt(currentEvent.ticketCount ));

        if (updatedTicketCount - parseInt(currentTicket.ticketCount)> parseInt(currentEvent.ticketCount)) {
            console.log("Available Ticket count ", parseInt(currentEvent.ticketCount) + parseInt(currentTicket.ticketCount));
            console.log("You are trying to book ", updatedTicketCount);
            var currentAvailable = parseInt(currentEvent.ticketCount) + parseInt(currentTicket.ticketCount);
            return { status: false, message: `Only ${currentAvailable} tickets are available, but you are trying to book ${updatedTicketCount}.` };
        }
        else {
            let availableTickets = parseInt(currentEvent.ticketCount) + parseInt(currentTicket.ticketCount)  - updatedTicketCount;
            console.log(availableTickets);

            const updatedEventCollection = await eventCollection.updateOne(
                { _id: event_objectId },  // Find the event by its ID
                { $set: { ticketCount:availableTickets } }
            );
            const updatedTicketCollection = await ticketCollection.updateOne(
                { _id: ticket_objectId },  // Find the event by its ID
                { $set: { ticketCount:updatedTicketCount } }
            );
            if (updatedEventCollection.matchedCount === 0) {
                console.log('Error');
                return null;  // User not found
            }
            return updatedEventCollection,updatedTicketCollection ;
        }


    } catch (error) {
        console.error('Error occurred while updating Event:', error);
        throw error; // Re-throw the error for handling at a higher level
        
    }
};



export const deletee = async (ticketId, eventId) => {
    console.log("Attempting to cancel ticket");
    console.log("ID", ticketId, "ID", eventId);

    try {
        // Connect to the database and get the event collection
        const { eventCollection } = await connectToDatabase();
        const { ticketCollection } = await connectToDatabase();


        // Ensure eventId is a valid ObjectId (if using MongoDB)
        const tId = new ObjectId(ticketId);
        const eId = new ObjectId(eventId);
        const currentTicket = await ticketCollection.findOne({ _id: tId });
        const currentEvent = await eventCollection.findOne({ _id: eId });
        console.log("c", currentTicket.ticketCount);
        console.log("d", currentEvent.ticketCount);


        const updatedTicketCount = parseInt(currentEvent.ticketCount) + parseInt(currentTicket.ticketCount);



        // const objectId = eventId instanceof ObjectId ? eventId : new ObjectId(eventId);

        // Delete the event document
        const deletedTicket = await ticketCollection.deleteOne(
            { _id: tId }  // Find the event by its unique _id
        );


        await eventCollection.updateOne(
            { _id: eId },  // Find the event by its ID
            { $set: { ticketCount: updatedTicketCount } }
        );

        if (deletedTicket.deletedCount === 0) {
            console.log('Event not found');
            return null;  // Event not found
        }
        console.log('Ticket deleted successfully:', deletedTicket);
        return deletedTicket;
    } catch (error) {
        console.error('Error occurred while deleting event:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};


export const view = async (userId) => {
    console.log("Attempting to view ticket history");
    try {
        // Connect to the database and get the event collection
        const { ticketCollection } = await connectToDatabase();


        // find the event document
        const result = await ticketCollection.find({ userId: userId }).toArray();  // Find all tickets by userId and convert to array

        console.log(result);  // This logs the result on the backend
        return result  // Send the result as JSON to the frontend
    } catch (error) {
        console.error('Error occurred while deleting event:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};


export const viewbyticketid = async (ticketId) => {
    console.log("Attempting to view ticket history");

    try {
        // Convert ticketId to ObjectId directly, without destructuring
        const id = new ObjectId(ticketId);  // This is the correct way to convert ticketId
        // Connect to the database and get the ticket collection
        const { ticketCollection } = await connectToDatabase();

        // Find the ticket document by its _id
        const result = await ticketCollection.findOne({ _id: id });  // Use id directly
        console.log(result);  // Log the result for debugging

        return result;  // Return the result to the frontend
    } catch (error) {
        console.error('Error occurred while viewing ticket:', error);
        throw error;  // Re-throw the error for handling at a higher level
    }
};
export const viewticketbyeventid = async (eventId) => {
    console.log("Attempting to view ticket history");

    try {
        // Convert ticketId to ObjectId directly, without destructuring
        const id = new ObjectId(eventId);  // This is the correct way to convert ticketId
        console.log(id);
        // Connect to the database and get the ticket collection
        const { ticketCollection } = await connectToDatabase();

        // Find the ticket document by its _id
        const result = await ticketCollection.findOne({ _id: id });  // Use id directly
        console.log(result);  // Log the result for debugging
        return result;  // Return the result to the frontend
    } catch (error) {
        console.error('Error occurred while viewing ticket:', error);
        throw error;  // Re-throw the error for handling at a higher level
    }
};




// export const viewbyticketid = async (ticketId) => {
//     console.log("Attempting to view ticket history ok");
//     try {
//         const{id} = new ObjectId(ticketId);
//         console.log(id ); 
//         // Connect to the database and get the event collection
//         const { ticketCollection } = await connectToDatabase();


//         // find the event document
//         const result = await ticketCollection.findOne({ _id: id });  // Find all tickets by userId and convert to array
//         console.log(result);  // This logs the result on the backend
//         return result  // Send the result as JSON to the frontend
//     } catch (error) {
//         console.error('Error occurred while deleting event:', error);
//         throw error; // Re-throw the error for handling at a higher level
//     }
// };

