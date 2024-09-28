// import {config} from 'dotenv';
// import fs from 'fs';
// import {createPool} from 'mysql2/promise';

// config();

// const pool = createPool({
//     database: process.env.A_MYSQL_DATABASE_NAME,
//     host: process.env.A_MYSQL_HOST,
//     user: process.env.A_MYSQL_USER,
//     port: process.env.A_MYSQL_PORT, 
//     password: process.env.A_MYSQL_PASSWORD,
//     ssl: {
//         ca: fs.readFileSync(process.env.CERT)
//       }
// });


// const  connectToDatabase =async()=> {
//     try {
//         await pool.getConnection();
//         console.log("database connection successful");
//     } catch (error) {
//         console.log("database connection failed");
//         console.log(error);
//         throw error;
//     }
// }

// export {connectToDatabase,pool};



import { MongoClient } from 'mongodb';
import {config} from 'dotenv';

 config();
// Replace with your MongoDB connection string
const uri = process.env.MongoDB_ConnectionString;

let client;
let userCollection;
let eventCollection;
const connectToDatabase = async () => {
    if (client && userCollection && eventCollection) return { client, userCollection, eventCollection };
    client = new MongoClient(uri);
    try {
        await client.connect(); // Connect to MongoDB cluster   
        const db = client.db('InstantTickets'); // Access the database
        userCollection = db.collection('Users'); // Access the collection      
        eventCollection = db.collection('Events'); // Access the collection    
        console.log('Connected successfully to MongoDB');
        console.log('Database up!\n');
        return { client, userCollection, eventCollection };
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw error for handling at a higher level
    }
}
export { connectToDatabase };


