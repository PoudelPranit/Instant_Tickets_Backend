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
        if (result.acknowledged === true && result.insertedId) {
            console.log('User created successfully:', result);
            return { success: true, message: "success"};
        } else {
            return { success: false, message: "fail" };
        }
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


export const login = async (email, password) => {
    console.log("Login attempt for:", email);

    try {
        // Connect to the database and get the user collection
        const { userCollection } = await connectToDatabase();

        // Find the user by email
        const user = await userCollection.findOne({ email });

        // If no user is found, return null
        if (!user) {
            console.log('User not found');
            return null;
        }

        // Assuming you have a function to validate passwords
        if (user.email == email && user.password == password){
            console.log(user);
            return user;  // Return the user data if login is successful
        }
        else{
            console.log('Invalid password');
            return null; // Invalid password
        }     

    } catch (error) {
        console.error('Error occurred while logging in:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
};