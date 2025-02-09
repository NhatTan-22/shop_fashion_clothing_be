export enum ROLE_ENUM {
  ADMIN = 0,
  USER = 1,
}

export enum MESSAGE_ENUM {
  // SUCCESS
  SUCCESS_LOGIN = "Login successfully.",
  SUCCESS_REGISTER = "Create user successfully.",
  // WARNING
  WARNING_LOGIN_EMAIL = "Email already exists.",

  WARNING_LOGIN = "Please login!",
  WARNING_NOT_USER = "User not found!",
  WARNING_NOT_INTEREST = "You do not have access!",
  // ERROR
  ERROR_LOGIN = "Email/Password does not exist.",
  ERROR_LOGIN_FAIL = "Login failed! Please check Email/Password and login again.",

  ERROR_TOKEN_ACCESS_DENIED = "Access denied",
  ERROR_TOKEN_INVALID_TOKEN = "Invalid Token",
}

export enum MESSAGE_SUPPLIER_ENUM {
  // SUCCESS
  SUCCESS_CREATE_SUPPLIER = "Create supplier successfully.",
  SUCCESS_GET_SUPPLIER = "GET list supplier.",
  // WARNING
  WARNING_SUPPLIER_CODE = "Supplier already exists.",
  // ERROR
  // ERROR_SUPPLIER = "Email/Password does not exist.",
}

export enum MESSAGE_PRODUCT_ENUM {
  // SUCCESS
  SUCCESS_CREATE_PRODUCT = "Create product successfully.",
  SUCCESS_GET_PRODUCT = "GET list product.",
  // WARNING
  WARNING_PRODUCT_CODE = "Product already exists.",
  // ERROR
  // ERROR_PRODUCT = "Email/Password does not exist.",
}
