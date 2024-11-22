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
  name: "Admin",
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
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "30m",
  });

  return accessToken;
};
