import { IOrder, IUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const userCreateService = async (userData: IUser) => {


  const user = await User.create(userData);
  return user;
};

const getAllUserService = async () => {
  const users = await User.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
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
          username: 1,
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

const getSingleUserAndUpdateService = async (
  userId: number,
  userData: IUser,
) => {
  const userIdExists = await User.isUserExists(userId);
  if (userIdExists) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(process.env.SALT_ROUND),
    );

    await User.updateOne({ userId: userId }, userData, {
      new: true,
      runValidators: true,
    });

    const result = await User.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          isActive: 1,
          email: 1,
          hobbies: 1,
          address: 1,
        },
      },
    ]);

    return result;
  } else {
    throw new Error('User not found');
  }
};

const getSingleUserAndDeleteService = async (userId: number) => {
  const userIdExists = await User.isUserExists(userId);
  if (userIdExists) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

const getOrderDataAndAddedService = async (
  userId: number,
  userOrder: IOrder,
) => {
  const userIdExists = await User.isUserExists(userId);
  if (userIdExists) {
    const user = await User.findOne({ userId: userId });
    if (user?.orders && Array.isArray(user.orders)) {
      await User.updateOne(
        { userId: userId },
        { $push: { orders: userOrder } },
      );
    } else {
      await User.updateOne(
        { userId: userId },
        { $set: { orders: [userOrder] } },
      );
    }
  } else {
    throw new Error('User not found');
  }
};

const getUserAllOrdersService = async (userId: number) => {
  const userIdExists = await User.isUserExists(userId);
  if (userIdExists) {
    const result = await User.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $project: { _id: 0, orders: 1 },
      },
    ]);
    return result[0];
  } else {
    throw new Error('User not found');
  }
};

const getUserAllOrdersTotalPriceService = async (userId: number) => {
  const userIdExists = await User.isUserExists(userId);
  if (userIdExists) {
    const result = await User.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: {
              $multiply: ['$orders.price', '$orders.quantity'],
            },
          },
        },
      },
      {
        $project: { _id: 0, totalPrice: 1 },
      },
    ]);
    return result[0]?.totalPrice || 0;
  } else {
    throw new Error('User not found');
  }
};

export const userService = {
  userCreateService,
  getAllUserService,
  getSingleUserService,
  getSingleUserAndUpdateService,
  getSingleUserAndDeleteService,
  getOrderDataAndAddedService,
  getUserAllOrdersService,
  getUserAllOrdersTotalPriceService,
};
