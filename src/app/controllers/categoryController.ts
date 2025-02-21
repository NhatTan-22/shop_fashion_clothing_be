import { MESSAGE_CATEGORY_ENUM } from "~/utils/constants/enum";
import CategoryModel from "../models/CategoriesModel";

// [GET] /categories
const getCategories = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.query;

    const skip = (currentPage - 1) * limitPage;
    const supplierLength = await CategoryModel.countDocuments();

    const supplierData = await CategoryModel.find({})
      .skip(skip)
      .limit(limitPage);

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_CATEGORY_ENUM.SUCCESS_GET_CATEGORY,
      data: {
        data: supplierData,
        pagination: {
          lengthPage: supplierLength,
          currentPage: Number(currentPage),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [GET] /select
const searchCategories = async (req: any, res: any) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const categoryData = await CategoryModel.find(query).limit(5);

    const dataSearch = categoryData.map((category) => ({
      value: category._id,
      label: `${category.name}`,
    }));

    return res.status(200).json({
      code: 1015,
      message: "Search success.",
      data: dataSearch,
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /category/new-add
const addCategory = async (req: any, res: any) => {
  try {
    const body = req.body;
    const isCategory = await CategoryModel.find({
      label: body.label,
    });

    if (isCategory) {
      return res.status(400).json({
        code: 1011,
        message: "Category already exists.",
      });
    }

    await CategoryModel.create({ body });

    return res.status(201).json({
      code: 1010,
      message: "Create category successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { addCategory, getCategories, searchCategories };
