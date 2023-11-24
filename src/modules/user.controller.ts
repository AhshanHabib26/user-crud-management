import { Request, Response } from 'express';
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
  } catch (error) {
    console.log(error);
  }
};

export const userController = {
  createUser,
};
