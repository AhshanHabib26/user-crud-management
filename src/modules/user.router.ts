import express from "express";
import { userController } from "./user.controller";
const userRouter = express.Router();


userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:userId", userController.getSingleUser);

export default userRouter;