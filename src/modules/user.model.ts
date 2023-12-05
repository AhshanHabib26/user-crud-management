import mongoose, { Schema } from 'mongoose';
import { IOrder, IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';

// Order Schema Described Here
const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

// Main User Schema Described Here With "IUser" & "UserModel"
const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'ID is required'],
  },
  username: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'FirstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'LastName is required'],
    },
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies is required'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street name is required'],
    },
    city: {
      type: String,
      required: [true, 'City name is required'],
    },
    country: {
      type: String,
      required: [true, 'Country name is required'],
    },
  },
  orders: {
    type: [orderSchema],
    required: false,
  },
});

// User Password Hashed Before Save DB Using "bcrypt" Described Here
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUND),
  );
  next();
});

// If userId exisits
userSchema.pre('save', async function (next) {
  const isIdExists = await User.findOne({
    userId: this.userId,
  });
  if (isIdExists) {
    throw new Error('userId already exists');
  }
  next();
});

// Statics Method Described Here
userSchema.statics.isUserExists = async function (userId: number) {
  const checkIfUser = await User.findOne({ userId });
  return checkIfUser;
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
