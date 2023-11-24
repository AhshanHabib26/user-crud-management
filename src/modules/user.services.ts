import { IUser } from './user.interface';
import { User } from './user.model';

const userCreateService = async (userData: IUser) => {
  const user = await User.create(userData);
  return user;
};


export const userService = {
    userCreateService
}