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

export const userService = {
  userCreateService,
  getAllUserService,
};
