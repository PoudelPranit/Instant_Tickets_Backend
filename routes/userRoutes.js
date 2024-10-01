import express from 'express';
import { createUser, loginUser, updateUser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/createuser", createUser);
userRouter.put("/updateuser/:id", updateUser);
userRouter.post("/loginuser", loginUser);

export default userRouter;