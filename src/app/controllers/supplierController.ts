// Libs
// Others
import { ISupplier } from "~/utils/interfaces/supplier";
import SupplierModel from "../models/SuppliersModel";
import { MESSAGE_SUPPLIER_ENUM } from "~/utils/constants/enum";

// [GET] /suppliers
const getSuppliers = async (req: any, res: any) => {
  try {
    const { search, currentPage, limitPage } = req.query;
    if (search) {
      const query = { supplierCode: { $regex: search, $options: "i" } };

      const supplierData = await SupplierModel.find(query).limit(5);

      const dataSearch = supplierData.map((supplier) => ({
        value: supplier.supplierCode,
        label: `${supplier.supplierCode} - ${supplier.supplierName}`,
      }));

      return res.status(200).json({
        code: 1010,
        message: "Tìm kiếm thành công",
        data: dataSearch,
      });
    }

    const skip = (currentPage - 1) * limitPage;
    const supplierLength = await SupplierModel.countDocuments();

    const supplierData = await SupplierModel.find({})
      .skip(skip)
      .limit(limitPage);

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_SUPPLIER_ENUM.SUCCESS_GET_SUPPLIER,
      data: {
        data: supplierData,
        pagination: {
          lengthPage: supplierLength,
          currentPage: Number(currentPage),
        },
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /suppliers/new-add
const addSupplier = async (req: any, res: any) => {
  try {
    const body: ISupplier = req.body;

    const isSupplierCode = await SupplierModel.find({
      supplierCode: body.supplierCode,
    });

    if (!isSupplierCode) {
      return res.status(400).json({
        code: 1011,
        message: MESSAGE_SUPPLIER_ENUM.WARNING_SUPPLIER_CODE,
      });
    }

    if (typeof body.isTaking === "string") {
      body.isTaking = JSON.parse(body.isTaking);
    }

    const newSupplier = await SupplierModel.create({
      ...body,
      isTaking: [0],
      supplierImage: req.file.path,
    });

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_SUPPLIER_ENUM.SUCCESS_CREATE_SUPPLIER,
      data: newSupplier,
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { getSuppliers, addSupplier };
