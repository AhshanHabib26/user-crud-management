import { NextFunction, Request, Response } from 'express';
import userSchemaValidation from './user.validation';
import { userService } from './user.services';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const userDataValidation = userSchemaValidation.parse(userData);
    const result = await userService.userCreateService(userDataValidation);

    const userUpdateResponse = {
      _id: result._id,
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(200).json({
      success: true,
      message: 'User created succesfully!',
      data: userUpdateResponse,
    });
  } catch (error) {
    next(error);
  }
};


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getAllUserService();
  
      res.status(200).json({
        success: true,
        message: "User fetched succesfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };



  const getSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params
      const result = await userService.getSingleUserService(Number(userId))
      res.status(200).json({
        success: true,
        message: "User fetched succesfully!",
        data: result,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
  
      next(error);
    }
  };

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser
};
