// Libs
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// Others
import { ROLE_ENUM } from "./enum";
import { IAdmin } from "../interfaces/user";
import UsersModel from "~/app/models/UsersModel";
import { IPayloadAccessToken } from "../interfaces/common";

dotenv.config();

const adminData: IAdmin = {
  firstName: "Nhat",
  lastName: "Tan",
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  role: ROLE_ENUM.ADMIN,
};

// Function Create Admin
export const createAdminUser = async () => {
  try {
    const existingAdmin = await UsersModel.findOne({
      role: ROLE_ENUM.ADMIN,
    });

    if (existingAdmin) {
      return "Admin user already exists.";
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    const newAdmin = new UsersModel({
      ...adminData,
      password: hashedPassword,
    });

    await newAdmin.save();
    return "Admin user created successfully!";
  } catch (error) {
    return `Error creating admin user: ${error}`;
  }
};

// Handle Get AccessToken
export const getAccessToken = async (payload: IPayloadAccessToken) => {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "3h",
    }
  );

  return accessToken;
};

// Handle Get RefreshToken
export const getRefreshToken = async (payload: IPayloadAccessToken) => {
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
};

// Price calculation function after applying discount code
export const applyDiscount = (
  price: number,
  discount: {
    discountType: "PERCENTAGE" | "FIXED";
    value: number;
    maxDiscount?: number;
  }
) => {
  let finalPrice = price;

  if (discount.discountType === "PERCENTAGE") {
    let discountAmount = (price * discount.value) / 100;
    if (discount.maxDiscount) {
      discountAmount = Math.min(discountAmount, discount.maxDiscount);
    }
    finalPrice -= discountAmount;
  } else if (discount.discountType === "FIXED") {
    finalPrice -= discount.value;
  }

  return Math.max(finalPrice, 0);
};

// Transaction Code Generation Function
export const generateTransactionId = (transactionType: string): string => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now();
  return `${transactionType}-${timestamp}-${randomPart}`;
};
