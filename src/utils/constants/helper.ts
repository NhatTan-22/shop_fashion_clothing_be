import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ROLE_ENUM } from "./enum";
import UserModel from "~/app/models/UsersModel";

dotenv.config();

const adminData = {
  name: "Admin",
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  role: ROLE_ENUM.ADMIN,
};

async function CreateAdminUser() {
  try {
    const existingAdmin = await UserModel.findOne({ role: ROLE_ENUM.ADMIN });

    console.log("existingAdmin:", existingAdmin);
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    const newAdmin = new UserModel({
      ...adminData,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

export default CreateAdminUser;
