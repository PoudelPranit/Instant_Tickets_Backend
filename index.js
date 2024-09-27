import express from 'express';
import cors from 'cors';
import {connectToDatabase} from './database/database.js';
//import appRouter from './routes/userRoutes.js';


//config
const app = express();

//middleware
app.use(express.json());

//app.use("/instanttickets", appRouter);


const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [process.env.PRODUCTION_URL]
    : [process.env.DEVLOPMENT_URL];
    // console.log("Environment:", process.env.NODE_ENV);
    // console.log("Allowed Origins:", allowedOrigins);
    // console.log("Allowed Origins:", allowedOrigins);

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

//const PORT = process.env.A_PORT;



connectToDatabase()
    .then(() => {
         const PORT = process.env.A_PORT;
        app.listen(PORT, () => console.log("server listening on port ", PORT));
    }).catch(error => {
        console.log("error database connection");
        console.log(error);
        process.exit(0);
    });

