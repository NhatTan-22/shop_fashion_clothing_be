import { MESSAGE_PRODUCT_ENUM } from "~/utils/constants/enum";
import ProductModel from "../models/ProductsModel";
import { IProduct } from "~/utils/interfaces/product";

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
    return res.status(500).json({
      code: 1013,
      message: error.message || "Lỗi server, vui lòng thử lại sau!",
    });
  }
};

// [GET] /products/detail/:slug
const getDetailProduct = async (req: any, res: any) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        code: 1011,
        message: `Not found product id: ${slug}.`,
      });
    }

    const productData = await ProductModel.findOne({ slug: slug })
      .populate("category")
      .populate({
        path: "supplier",
        select: "supplierName",
      });
    // .populate({
    //   path: "brand",
    // });

    const relatedProducts = await ProductModel.find({
      category: productData.category,
      _id: { $ne: productData._id },
    }).limit(4);

    res.status(200).json({
      code: 1010,
      data: {
        data: productData,
        relate: relatedProducts,
      },
      message: MESSAGE_PRODUCT_ENUM.SUCCESS_GET_PRODUCT,
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /products/new-add
const addProduct = async (req: any, res: any) => {
  try {
    const body: IProduct = req.body;

    const isProduct = await ProductModel.findOne({ slug: body.slug });

    if (isProduct) {
      return res.status(400).json({
        code: 1011,
        message: MESSAGE_PRODUCT_ENUM.WARNING_PRODUCT_CODE,
      });
    }

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

    const newProduct = await ProductModel.create({
      ...parsedBody,
      images: images,
    });

    return res.status(201).json({
      code: 1010,
      message: MESSAGE_PRODUCT_ENUM.SUCCESS_CREATE_PRODUCT,
    });
  } catch (error) {
    return res.status(500).json({
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
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { getProducts, getDetailProduct, addProduct, deleteProduct };
