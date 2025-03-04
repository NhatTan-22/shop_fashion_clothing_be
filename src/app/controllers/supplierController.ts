// Libs
// Others
import { ISupplier } from "~/utils/interfaces/supplier";
import SupplierModel from "../models/SuppliersModel";
import { MESSAGE_SUPPLIER_ENUM } from "~/utils/constants/enum";
import { generateTransactionId } from "~/utils/constants/helper";

// [GET] /select
const searchSuppliers = async (req: any, res: any) => {
  try {
    const { search } = req.query;
    const query = search ? { sku: { $regex: search, $options: "i" } } : {};

    const supplierData = await SupplierModel.find(query).limit(5);

    const dataSearch = supplierData.map((supplier) => ({
      value: supplier._id,
      label: `${supplier.sku} - ${supplier.supplierName}`,
    }));

    return res.status(200).json({
      code: 1015,
      message: "Search success.",
      data: dataSearch,
    });
  } catch (error) {
    return res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [GET] /suppliers
const getSuppliers = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.query;
    const supplierLength = await SupplierModel.countDocuments();

    const skip = (currentPage - 1) * limitPage;

    const supplierData = await SupplierModel.find({})
      .skip(skip)
      .limit(limitPage)
      .populate({
        path: "categories",
        select: "name",
      })
      .lean();

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
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /suppliers/new-add
const addSupplier = async (req: any, res: any) => {
  try {
    const body: ISupplier = req.body;

    const supplierSku = generateTransactionId("SUP");

    if (body.importPrice && body.importPrice < 999999) {
      body.importPrice *= 1000;
    }

    if (typeof req.body.categories === "string") {
      req.body.categories = JSON.parse(req.body.categories);
    }

    await SupplierModel.create({
      ...body,
      sku: supplierSku,
      image: req.file.path,
    });

    return res.status(201).json({
      code: 1010,
      message: MESSAGE_SUPPLIER_ENUM.SUCCESS_CREATE_SUPPLIER,
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [DELETE] /:_id
const deleteSupplier = async (req: any, res: any) => {
  try {
    const { _id: idSupplier } = req.params;

    const isSupplier = await SupplierModel.findOne({ _id: idSupplier });

    if (isSupplier) {
      await SupplierModel.deleteOne({ _id: idSupplier });

      return res.status(200).json({
        code: 1010,
        message: MESSAGE_SUPPLIER_ENUM.SUCCESS_DELETE_SUPPLIER,
      });
    }
  } catch (error) {
    return res.status(505).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { getSuppliers, addSupplier, searchSuppliers, deleteSupplier };
