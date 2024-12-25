"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_PRODUCT_ENUM = exports.MESSAGE_SUPPLIER_ENUM = exports.MESSAGE_ENUM = exports.ROLE_ENUM = void 0;
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
    // ERROR
    MESSAGE_ENUM["ERROR_LOGIN"] = "Email/Password does not exist.";
    MESSAGE_ENUM["ERROR_LOGIN_FAIL"] = "Login failed! Please check Email/Password and login again.";
    MESSAGE_ENUM["ERROR_TOKEN_ACCESS_DENIED"] = "Access denied";
    MESSAGE_ENUM["ERROR_TOKEN_INVALID_TOKEN"] = "Invalid Token";
})(MESSAGE_ENUM || (exports.MESSAGE_ENUM = MESSAGE_ENUM = {}));
var MESSAGE_SUPPLIER_ENUM;
(function (MESSAGE_SUPPLIER_ENUM) {
    // SUCCESS
    MESSAGE_SUPPLIER_ENUM["SUCCESS_CREATE_SUPPLIER"] = "Create supplier successfully.";
    MESSAGE_SUPPLIER_ENUM["SUCCESS_GET_SUPPLIER"] = "GET list supplier.";
    // WARNING
    MESSAGE_SUPPLIER_ENUM["WARNING_SUPPLIER_CODE"] = "Supplier already exists.";
    // ERROR
    // ERROR_SUPPLIER = "Email/Password does not exist.",
})(MESSAGE_SUPPLIER_ENUM || (exports.MESSAGE_SUPPLIER_ENUM = MESSAGE_SUPPLIER_ENUM = {}));
var MESSAGE_PRODUCT_ENUM;
(function (MESSAGE_PRODUCT_ENUM) {
    // SUCCESS
    MESSAGE_PRODUCT_ENUM["SUCCESS_CREATE_PRODUCT"] = "Create product successfully.";
    MESSAGE_PRODUCT_ENUM["SUCCESS_GET_PRODUCT"] = "GET list product.";
    // WARNING
    MESSAGE_PRODUCT_ENUM["WARNING_PRODUCT_CODE"] = "Product already exists.";
    // ERROR
    // ERROR_PRODUCT = "Email/Password does not exist.",
})(MESSAGE_PRODUCT_ENUM || (exports.MESSAGE_PRODUCT_ENUM = MESSAGE_PRODUCT_ENUM = {}));
//# sourceMappingURL=enum.js.map