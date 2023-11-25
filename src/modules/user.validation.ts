import { z } from 'zod';

const userNameValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const userAddressValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const userOrderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userSchemaValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userNameValidation,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: userAddressValidation,
  orders: z.array(userOrderValidation).optional(),
});

export default userSchemaValidation;
