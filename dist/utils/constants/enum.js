"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_REVIEW_ENUM = exports.MESSAGE_ORDER_ENUM = exports.MESSAGE_BRAND_ENUM = exports.MESSAGE_PRODUCT_ENUM = exports.MESSAGE_CATEGORY_ENUM = exports.MESSAGE_SUPPLIER_ENUM = exports.MESSAGE_ENUM = exports.ROLE_ENUM = void 0;
var ROLE_ENUM;
(function (ROLE_ENUM) {
    ROLE_ENUM[ROLE_ENUM["ADMIN"] = 0] = "ADMIN";
    ROLE_ENUM[ROLE_ENUM["USER"] = 1] = "USER";
})(ROLE_ENUM || (exports.ROLE_ENUM = ROLE_ENUM = {}));
var MESSAGE_ENUM;
(function (MESSAGE_ENUM) {
    // SUCCESS
    MESSAGE_ENUM["SUCCESS_LOGIN"] = "Login successfully.";
    MESSAGE_ENUM["SUCCESS_REGISTER"] = "Create user successfully.";
    // WARNING
    MESSAGE_ENUM["WARNING_LOGIN_EMAIL"] = "Email already exists.";
    MESSAGE_ENUM["WARNING_LOGIN"] = "Please login!";
    MESSAGE_ENUM["WARNING_NOT_USER"] = "User not found!";
    MESSAGE_ENUM["WARNING_NOT_INTEREST"] = "You do not have access!";
    // ERROR
    MESSAGE_ENUM["ERROR_LOGIN"] = "Email/Password does not exist.";
    MESSAGE_ENUM["ERROR_LOGIN_FAIL"] = "Login failed! Please check Email/Password and login again.";
    MESSAGE_ENUM["ERROR_TOKEN_ACCESS_DENIED"] = "Access denied";
    MESSAGE_ENUM["ERROR_TOKEN_INVALID_TOKEN"] = "Invalid Token";
    MESSAGE_ENUM["ERROR_TOKEN_EXPIRED"] = "Token expired";
})(MESSAGE_ENUM || (exports.MESSAGE_ENUM = MESSAGE_ENUM = {}));
var MESSAGE_SUPPLIER_ENUM;
(function (MESSAGE_SUPPLIER_ENUM) {
    // SUCCESS
    MESSAGE_SUPPLIER_ENUM["SUCCESS_CREATE_SUPPLIER"] = "Create supplier successfully.";
    MESSAGE_SUPPLIER_ENUM["SUCCESS_DELETE_SUPPLIER"] = "Delete supplier successfully.";
    MESSAGE_SUPPLIER_ENUM["SUCCESS_GET_SUPPLIER"] = "GET list supplier.";
    // WARNING
    MESSAGE_SUPPLIER_ENUM["WARNING_SUPPLIER_CODE"] = "Supplier already exists.";
    // ERROR
    // ERROR_SUPPLIER = "Email/Password does not exist.",
    MESSAGE_SUPPLIER_ENUM["ERROR_SUPPLIER"] = "Unknown error.";
})(MESSAGE_SUPPLIER_ENUM || (exports.MESSAGE_SUPPLIER_ENUM = MESSAGE_SUPPLIER_ENUM = {}));
var MESSAGE_CATEGORY_ENUM;
(function (MESSAGE_CATEGORY_ENUM) {
    // SUCCESS
    MESSAGE_CATEGORY_ENUM["SUCCESS_CREATE_CATEGORY"] = "Create category successfully.";
    MESSAGE_CATEGORY_ENUM["SUCCESS_GET_CATEGORY"] = "GET list category.";
    // WARNING
    MESSAGE_CATEGORY_ENUM["WARNING_CATEGORY_CODE"] = "Category already exists.";
    // ERROR
    MESSAGE_CATEGORY_ENUM["ERROR_CATEGORY"] = "Unknown error.";
})(MESSAGE_CATEGORY_ENUM || (exports.MESSAGE_CATEGORY_ENUM = MESSAGE_CATEGORY_ENUM = {}));
var MESSAGE_PRODUCT_ENUM;
(function (MESSAGE_PRODUCT_ENUM) {
    // SUCCESS
    MESSAGE_PRODUCT_ENUM["SUCCESS_CREATE_PRODUCT"] = "Create product successfully.";
    MESSAGE_PRODUCT_ENUM["SUCCESS_GET_PRODUCT"] = "GET list product.";
    // WARNING
    MESSAGE_PRODUCT_ENUM["WARNING_PRODUCT_CODE"] = "Product already exists.";
    // WARNING_PRODUCT_DETAIL = "Email/Password does not exist.",
    // ERROR
    MESSAGE_PRODUCT_ENUM["ERROR_PRODUCT"] = "Unknown error.";
})(MESSAGE_PRODUCT_ENUM || (exports.MESSAGE_PRODUCT_ENUM = MESSAGE_PRODUCT_ENUM = {}));
var MESSAGE_BRAND_ENUM;
(function (MESSAGE_BRAND_ENUM) {
    // SUCCESS
    MESSAGE_BRAND_ENUM["SUCCESS_GET_BRAND"] = "GET list brand.";
    MESSAGE_BRAND_ENUM["SUCCESS_CREATE_BRAND"] = "Create brand successfully.";
    MESSAGE_BRAND_ENUM["SUCCESS_SELECT_BRAND"] = "Create select successfully.";
    // WARNING
    MESSAGE_BRAND_ENUM["WARNING_BRAND_CREATE"] = "Brand already exists.";
    // ERROR
    MESSAGE_BRAND_ENUM["ERROR_BRAND"] = "Unknown error.";
})(MESSAGE_BRAND_ENUM || (exports.MESSAGE_BRAND_ENUM = MESSAGE_BRAND_ENUM = {}));
var MESSAGE_ORDER_ENUM;
(function (MESSAGE_ORDER_ENUM) {
    // SUCCESS
    MESSAGE_ORDER_ENUM["SUCCESS_GET_ORDER"] = "GET list order.";
    MESSAGE_ORDER_ENUM["SUCCESS_CREATE_ORDER"] = "Create order successfully.";
    MESSAGE_ORDER_ENUM["SUCCESS_SELECT_ORDER"] = "Create select successfully.";
    // WARNING
    MESSAGE_ORDER_ENUM["WARNING_ORDER_CREATE"] = "order already exists.";
    // ERROR
    MESSAGE_ORDER_ENUM["ERROR_ORDER"] = "Unknown error.";
})(MESSAGE_ORDER_ENUM || (exports.MESSAGE_ORDER_ENUM = MESSAGE_ORDER_ENUM = {}));
var MESSAGE_REVIEW_ENUM;
(function (MESSAGE_REVIEW_ENUM) {
    // SUCCESS
    MESSAGE_REVIEW_ENUM["SUCCESS_GET_REVIEW"] = "GET list review.";
    MESSAGE_REVIEW_ENUM["SUCCESS_CREATE_REVIEW"] = "Create review successfully.";
    // SUCCESS_SELECT_REVIEW = "Create select successfully.",
    // WARNING
    // WARNING_REVIEW_CREATE = "review already exists.",
    // ERROR
    MESSAGE_REVIEW_ENUM["ERROR_REVIEW"] = "Unknown error.";
})(MESSAGE_REVIEW_ENUM || (exports.MESSAGE_REVIEW_ENUM = MESSAGE_REVIEW_ENUM = {}));
//# sourceMappingURL=enum.js.map