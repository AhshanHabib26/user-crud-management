import { IUser } from './user.interface';
import { User } from './user.model';

const userCreateService = async (userData: IUser) => {
  const user = await User.create(userData);
  return user;
};

const getAllUserService = async () => {
  const users = await User.aggregate([
    {
      $project: {
        _id: 0,
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return users;
};

const getSingleUserService = async (userId: number) => {
  const userIdExists = await User.isUserExists(userId);
  if (userIdExists) {
    const result = await User.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          userName: 1,
          fullName: 1,
          age: 1,
          isActive: 1,
          email: 1,
          hobbies: 1,
          address: 1,
        },
      },
    ]);
    return result[0];
  } else {
    throw new Error('User not found');
  }
};

export const userService = {
  userCreateService,
  getAllUserService,
  getSingleUserService,
};
