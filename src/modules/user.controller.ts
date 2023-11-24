import { NextFunction, Request, Response } from 'express';
import userSchemaValidation from './user.validation';
import { userService } from './user.services';

const createUser = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error',
      error: {
        code: 500,
        description: error.message || 'Server Error',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserService();

    res.status(200).json({
      success: true,
      message: 'User fetched succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Try again!',
      error: {
        code: 500,
        description: error.message || 'Try again!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUserService(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 500,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

const getSingleUserAndUpdate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const result = await userService.getSingleUserAndUpdateService(
      Number(userId),
      userData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 500,
        description: error.message || 'Something went wrong',
      },
    });
  }
};


const getSingleUserAndDelete = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUserAndDeleteService(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'User Deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 500,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getSingleUserAndUpdate,
  getSingleUserAndDelete,
};
