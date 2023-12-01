import {  Request, Response } from 'express';
import userSchemaValidation, { userOrderValidation } from './user.validation';
import { userService } from './user.services';

// @desc      User Create Controller
// @route     POST /api/users
// @access    public
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
    res.status(404).json({
      success: false,
      message: error.message || 'Server Error',
      error: {
        code: 404,
        description: error.message || 'Server Error',
      },
    });
  }
};

// @desc      Get All User Controller
// @route     GET /api/users
// @access    public
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserService();

    res.status(200).json({
      success: true,
      message: 'Users fetched succesfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Try again!',
      error: {
        code: 404,
        description: error.message || 'Try again!',
      },
    });
  }
};

// @desc      Get Single User Controller
// @route     GET /api/users/:userId
// @access    public
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
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

// @desc      Update Single User Controller
// @route     PUT /api/users/:userId
// @access    public
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
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

// @desc      Delete Single User Controller
// @route     DELTE /api/users/:userId
// @access    public
const getSingleUserAndDelete = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingleUserAndDeleteService(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

// @desc      Add Order Controller
// @route     PUT /api/users/:userId/orders
// @access    public
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
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

// @desc      Get All Order For Specific User Controller
// @route     GET /api/users/:userId/orders
// @access    public
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
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: error.message || 'Something went wrong',
      },
    });
  }
};

// @desc      Calculate Order Total Price and Quantity Controller
// @route     GET /api/users/:userId/orders
// @access    public
const getUserAllOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getUserAllOrdersTotalPriceService(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
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
