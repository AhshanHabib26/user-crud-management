import express from 'express';
import { userController } from './user.controller';
const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);
userRouter.get('/:userId', userController.getSingleUser);
userRouter.put('/:userId', userController.getSingleUserAndUpdate);
userRouter.delete('/:userId', userController.getSingleUserAndDelete);
userRouter.put('/:userId/orders', userController.getUserOrderDataAndAdded);
userRouter.get('/:userId/orders', userController.getUserAllOrders);
userRouter.get('/:userId/orders/total-price', userController.getUserAllOrdersTotalPrice) 

export default userRouter;
