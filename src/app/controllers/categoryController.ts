import { MESSAGE_CATEGORY_ENUM } from "~/utils/constants/enum";
import CategoryModel from "../models/CategoriesModel";
import { ICategory } from "~/utils/interfaces/category";

// [GET] /categories
const getCategories = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.query;

    const skip = (currentPage - 1) * limitPage;
    const categoryLength = await CategoryModel.countDocuments();

    const categoryData = await CategoryModel.find({})
      .skip(skip)
      .limit(limitPage);

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_CATEGORY_ENUM.SUCCESS_GET_CATEGORY,
      data: {
        data: categoryData,
        pagination: {
          lengthPage: categoryLength,
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
    const body: ICategory = req.body;
    const isCategory = await CategoryModel.find({
      name: body.name,
    });


    if (!isCategory) {
      return res.status(400).json({
        code: 1011,
        message: MESSAGE_CATEGORY_ENUM.WARNING_CATEGORY_CODE,
      });
    }

    await CategoryModel.create({
      ...body,
      image: req.file.path,
    });

    return res.status(201).json({
      code: 1010,
      message: MESSAGE_CATEGORY_ENUM.SUCCESS_CREATE_CATEGORY,
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { addCategory, getCategories, searchCategories };
