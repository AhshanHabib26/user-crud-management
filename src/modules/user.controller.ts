import { NextFunction, Request, Response } from 'express';
import userSchemaValidation, { userOrderValidation } from './user.validation';
import { userService } from './user.services';


// 1. Create a new user & Return
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userDataValidation = userSchemaValidation.parse(userData);
    const result = await userService.userCreateService(userDataValidation);

    const userUpdateResponse = {
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

// 2. Retrieve a list of all users
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


// 3. Retrieve a specific user by ID
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


// 4. Update user information using userId
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


// 5. Delete a user using userId
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


// 6. Add New Product in Order
const getUserOrderDataAndAdded = async (req: Request, res: Response) => {
  try {
    const userOrder = req.body;
    const userOrderDataValidation = userOrderValidation.parse(userOrder);
    const { userId } = req.params;
    const result = await userService.getOrderDataAndAddedService(
      Number(userId),
      userOrderDataValidation,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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


// 7. Retrieve all orders for a specific userId & user
const getUserAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getUserAllOrdersService(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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

// 8. Calculate Total Price of Orders for a Specific userId & user
const getUserAllOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getUserAllOrdersTotalPriceService(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
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

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getSingleUserAndUpdate,
  getSingleUserAndDelete,
  getUserOrderDataAndAdded,
  getUserAllOrders,
  getUserAllOrdersTotalPrice,
};
