import { MESSAGE_BRAND_ENUM } from "~/utils/constants/enum";
import BrandModel from "../models/BrandsModel";

const getBrand = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.query;

    const skip = (currentPage - 1) * limitPage;
    const brandLength = await BrandModel.countDocuments();

    const brandData = await BrandModel.find({}).skip(skip).limit(limitPage);

    res.status(200).json({
      code: 1010,
      message: MESSAGE_BRAND_ENUM.SUCCESS_GET_BRAND,
      data: {
        data: brandData,
        pagination: {
          lengthPage: brandLength,
          currentPage: currentPage,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 1013,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const selectBrand = async (req: any, res: any) => {
  try {
    const { selectSearch } = req.query;

    const query = selectSearch
      ? { name: { $regex: selectSearch, $options: "i" } }
      : {};

    const brandData = await BrandModel.find(query).limit(5);

    const dataSearch = brandData.map((brand) => ({
      value: brand._id,
      label: `${brand.name}`,
    }));

    res.status(200).json({
      code: 1010,
      message: MESSAGE_BRAND_ENUM.SUCCESS_SELECT_BRAND,
      data: dataSearch,
    });
  } catch (error) {
    res.status(500).json({
      code: 1013,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const addBrand = async (req: any, res: any) => {
  try {
    const body = req.body;

    const isBrand = await BrandModel.find({
      name: body.name,
    });

    if (isBrand) {
      return res.status(400).json({
        code: 1011,
        message: MESSAGE_BRAND_ENUM.WARNING_BRAND_CREATE,
      });
    }

    await BrandModel.create({ body });

    res.status(200).json({
      code: 1010,
      message: MESSAGE_BRAND_ENUM.SUCCESS_SELECT_BRAND,
    });
  } catch (error) {
    res.status(500).json({
      code: 1013,
      error:
        error instanceof Error ? error.message : MESSAGE_BRAND_ENUM.ERROR_BRAND,
    });
  }
};

export { getBrand, selectBrand, addBrand };
