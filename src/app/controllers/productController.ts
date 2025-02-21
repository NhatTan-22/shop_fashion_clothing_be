import { MESSAGE_PRODUCT_ENUM } from "~/utils/constants/enum";
import ProductModel from "../models/ProductsModel";
import { IProduct } from "~/utils/interfaces/product";
import { generateTransactionId } from "~/utils/constants/helper";

// [GET] /products
const getProducts = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.query;

    const skip = (currentPage - 1) * limitPage;
    const productLength = await ProductModel.countDocuments();

    const productData = await ProductModel.find({})
      .skip(skip)
      .limit(limitPage)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "supplier",
        select: "supplierName",
      });
    // .populate({
    //   path: "brand",
    //   select: "name",
    // });

    res.status(200).json({
      code: 1010,
      data: {
        data: productData,
        pagination: {
          lengthPage: productLength,
          currentPage: Number(currentPage),
        },
      },
      message: MESSAGE_PRODUCT_ENUM.SUCCESS_GET_PRODUCT,
    });
  } catch (error) {
    res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /products/new-add
const addProduct = async (req: any, res: any) => {
  try {
    const body: IProduct = req.body;

    const parsedBody = {
      ...body,
      pricing:
        typeof body.pricing === "string"
          ? JSON.parse(body.pricing)
          : body.pricing,
      sizes:
        typeof body.sizes === "string" ? JSON.parse(body.sizes) : body.sizes,
      colors:
        typeof body.colors === "string" ? JSON.parse(body.colors) : body.colors,
      stock: Number(body.stock),
    };

    let images: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files.map((file: Express.Multer.File) => file.path);
    }

    const productSku = generateTransactionId("PROD");

    const newProduct = await ProductModel.create({
      ...parsedBody,
      sku: productSku,
      images: images,
    });

    return res.status(201).json({
      code: 1010,
      message: MESSAGE_PRODUCT_ENUM.SUCCESS_CREATE_PRODUCT,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { getProducts, addProduct, deleteProduct };
