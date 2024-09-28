import express from 'express';
import { createUser, updateUser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/createuser", createUser);
userRouter.put("/updateuser/:id", updateUser);

export default userRouter;