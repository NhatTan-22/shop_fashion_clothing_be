import CategoryModel from "../models/CategoriesModel";

// [GET] /category
const getCategory = async (req: any, res: any) => {
  try {
    const { search } = req.query;
    if (search) {
      const query = { label: { $regex: search, $options: "i" } };

      const categoryData = await CategoryModel.find(query);

    //   if (!categoryData.length) {
    //     return res.status(404).json({
    //       code: 1014,
    //       message: "Not found category.",
    //       data: [],
    //     });
    //   }

      const dataSearch = categoryData.map((category) => ({
        value: category._id,
        label: category.label,
      }));

      return res.status(200).json({
        code: 1010,
        message: "Search success.",
        data: dataSearch,
      });
    }
  } catch (error) {
    return res.status(404).json({
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

    const newCategory = await CategoryModel.create({
      body,
    });

    return res.status(201).json({
      code: 1010,
      message: "Create category successfully.",
      data: newCategory,
    });
  } catch (error) {
    return res.status(200).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { addCategory, getCategory };
