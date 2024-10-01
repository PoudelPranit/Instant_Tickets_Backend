import {create,login,update} from "../model/userModel.js";
 
export const createUser = async (req,res) => {
    
    const {firstName, lastName, contact, email, address, password}= req.body;

    if (!firstName || !lastName || !contact || !email|| !address || !password){
        //console.log('Request body:', req.body);
        return res.status(403).json({message :"body not provided"});
    }
    try {
        const user = await create(firstName, lastName, contact, email, address, password);
        //console.log("I am here");
        return res.status(403).json({user});
        
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    console.log("here");
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(403).json({ message: "Email and password are required" });
    }

    try {
        // Assuming `findUserByEmail` is a function that retrieves the user from the database by email
        const user = await login(email,password);

        // If user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If login is successful, you might want to return a token or some user data
        // Assuming `generateToken` is a function that generates a JWT or session token

        // Send the token or user data back to the client
        return res.status(200).json({ message: "Login successful", user });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
};


export const updateUser = async (req, res) => {
   // console.log("I am here");
   const { id } = req.params;
    const { firstName, lastName, contact, email, address, password } = req.body;
   // console.log("ID",req.params);
   // console.log("ID",id);
    //console.log("BODY",req.body);

    if (!req.params || !firstName || !lastName || !contact || !email || !address || !password) {
        return res.status(403).json({ message: "Required fields are missing" });
    }

    try {
        // Assuming updateUserById is a function to update the user in the database
        const updatedUser = await update(id, {
            firstName,
            lastName,
            contact,
            email,
            address,
            password,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while updating the user" });
    }
};
