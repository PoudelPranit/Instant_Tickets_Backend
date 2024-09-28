import { connectToDatabase } from '../database/database.js';
import { ObjectId } from 'mongodb'; // Make sure ObjectId is imported


export const create = async (firstName, lastName, contact, email, address, password) => {
    try {
        // Connect to the database and get the user collection
        const { userCollection } = await connectToDatabase();

        // Create a new user document
        const newUser = {
            firstName,
            lastName,
            contact,
            email,
            address,
            password
        };

        // Insert the new user into the Users collection
        const result = await userCollection.insertOne(newUser);

        console.log('User created successfully:', result);
        return result;
    } catch (error) {
        console.error('Error occurred while creating user:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};


export const update = async (userId, updatedData) => {
    console.log("I am here");
    console.log("ID",userId);
    console.log("body",updatedData);

    try {
        // Connect to the database and get the user collection
        const { userCollection } = await connectToDatabase();

        // Ensure userId is a valid ObjectId (if using MongoDB)
        const objectId = new ObjectId(userId);
        //const objectId = userId instanceof ObjectId ? userId : new ObjectId(userId);

        // Update the user document
        const result = await userCollection.updateOne(
            { _id: objectId },  // Find the user by their unique _id
            { $set: updatedData }  // Set the fields to be updated
        );

        if (result.matchedCount === 0) {
            console.log('User not found');
            return null;  // User not found
        }
        console.log('User updated successfully:', result);
        return result;
    } catch (error) {
        console.error('Error occurred while updating user:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};

