import { connectToDatabase } from '../database/database.js';
import { ObjectId } from 'mongodb'; // Make sure ObjectId is imported


export const create = async (performer, venue, date, time, ticketCount, price) => {
    try {
        console.log('i AM HERE');
        // Connect to the database and get the user collection
        const { eventCollection } = await connectToDatabase();

        // Create a new user document
        const newEvent = {
            performer,
            venue,
            date,
            time,
            ticketCount,
            price
        };

        // Insert the new user into the Users collection
        const result = await eventCollection.insertOne(newEvent);

        console.log('Event created successfully:', result);
        if (result.acknowledged === true && result.insertedId) {
            console.log('EVENT created successfully:', result);
            return { success: true, message: "success"};
        } else {
            return { success: false, message: "fail" };
        }
    } catch (error) {
        console.error('Error occurred while creating Event:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};


export const update = async (eventId, updatedData) => {
    console.log("I am here");
    console.log("ID", eventId);
    console.log("body", updatedData);

    try {
        // Connect to the database and get the user collection
        const { eventCollection } = await connectToDatabase();

        // Ensure userId is a valid ObjectId (if using MongoDB)
        const objectId = new ObjectId(eventId);

        // Update the user document
        const result = await eventCollection.updateOne(
            { _id: objectId },  // Find the user by their unique _id
            { $set: updatedData }  // Set the fields to be updated
        );

        if (result.matchedCount === 0) {
            console.log('Event not found');
            return null;  // User not found
        }
        console.log('Event  updated successfully:', result);
        return result;
    } catch (error) {
        console.error('Error occurred while updating Event:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};



export const deletee = async (eventId) => {
    console.log("Attempting to delete event");
    console.log("ID", eventId);

    try {
        // Connect to the database and get the event collection
        const { eventCollection } = await connectToDatabase();

        // Ensure eventId is a valid ObjectId (if using MongoDB)
        const objectId = new ObjectId(eventId);
        // const objectId = eventId instanceof ObjectId ? eventId : new ObjectId(eventId);

        // Delete the event document
        const result = await eventCollection.deleteOne(
            { _id: objectId }  // Find the event by its unique _id
        );

        if (result.deletedCount === 0) {
            console.log('Event not found');
            return null;  // Event not found
        }
        console.log('Event deleted successfully:', result);
        return result;
    } catch (error) {
        console.error('Error occurred while deleting event:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};


export const view = async () => {
    console.log("Attempting to view event");
    try {
        // Connect to the database and get the event collection
        const { eventCollection } = await connectToDatabase();


        // find the event document
        const result = await eventCollection.find({}).toArray();  // Get all events and convert to array
        console.log(result);  // This logs the result on the backend
        return result  // Send the result as JSON to the frontend
    } catch (error) {
        console.error('Error occurred while deleting event:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};
