import mongoose, { Schema } from 'mongoose';
import { IOrder, IUser } from './user.interface';
import bcrypt from 'bcrypt';

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

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'ID is required'],
    unique: true,
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUND),
  );
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
