import express from 'express';
import { createUser } from '../model/userModel.js';

const appRouter = express.Router();

appRouter.post("/createuser", createUser);

export default appRouter;