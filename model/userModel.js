// import  {connectToDatabase,pool} from '../database/database.js';
import  {connectToDatabase} from '../database/database.js';


export const createUser = async (firstName, lastName, contact, email, address, password) => {
    // const QUERY = `INSERT INTO users VALUES (?,?,?,?,?,?)`;
    // try {
    //     const client = await pool.getConnection();
    //     const result = await client.query(QUERY,[firstName, lastName, contact, email, address, password]);
    //     console.log(result);       
    //     return result;
    // } catch (error) {
    //     console.log("error occured with query");
    //     console.log(error);
    //     throw error;
    // }  
};