import { MESSAGE_PRODUCT_ENUM } from "~/utils/constants/enum";
import ProductModel from "../models/ProductsModel";
import { IProduct } from "~/utils/interfaces/product";

// [GET] /products
const getProducts = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.body;

    const skip = (currentPage - 1) * limitPage;
    const inventoryLength = await ProductModel.countDocuments();

    const inventoryData = await ProductModel.find({})
      .skip(skip)
      .limit(limitPage);

    res.status(200).json({
      code: 1010,
      data: {
        data: inventoryData,
        pagination: {
          lengthPage: inventoryLength,
          currentPage: Number(currentPage),
        },
      },
      message: MESSAGE_PRODUCT_ENUM.SUCCESS_GET_PRODUCT,
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /products/new-add
const addProduct = async (req: any, res: any) => {
  try {
    const body: IProduct = req.body;

    const isProductCode = await ProductModel.find({
      productCode: body.productCode,
    });

    if (isProductCode) {
      return res.status(400).json({
        code: 1011,
        message: MESSAGE_PRODUCT_ENUM.WARNING_PRODUCT_CODE,
      });
    }

    const newSupplier = await ProductModel.create({
      ...body,
      supplierImage: req.file.path,
    });

    return res.status(201).json({
      code: 1010,
      message: MESSAGE_PRODUCT_ENUM.SUCCESS_CREATE_PRODUCT,
      data: newSupplier,
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

const deleteProduct = async (req: any, res: any) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({
        code: 1011,
        message: `Not found product id: ${req.params._id}.`,
      });
    }

    await ProductModel.deleteOne({ _id });

    return res.status(200).json({
      code: 1010,
      message: `Delete product id: ${req.params._id} successfully.`,
      data: [],
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { getProducts, addProduct, deleteProduct };
