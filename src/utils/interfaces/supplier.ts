import { Document, ObjectId } from "mongoose";

export interface ISupplier extends Document {
  _id: ObjectId;
  sku: String;
  name: String;
  contactPerson: String;
  image: String;
  email: String;
  phone: String;
  address: String;
  categories: [ObjectId]; // Các danh mục mà nhà cung cấp cung cấp
  orderQuantity: Number; // Số lượng nhập về
  restockStatus: String; // "pending" | "shipped" | "received"
  expectedArrivalDate: Date; // Ngày dự kiến sản phẩm đến
  lastRestockDate?: Date; // Ngày nhập hàng gần nhất
  createdAt?: Date;
  updatedAt?: Date;
}
