import { Model } from 'mongoose';


// Order Interface Described Here
export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}


// User Interface Described Here
export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: IOrder[];
}


// userId Statics Interface Described Here
export interface UserModel extends Model<IUser> {
  isUserExists(userId: number): Promise<IUser | null>;
}
