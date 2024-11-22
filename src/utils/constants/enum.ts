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
  // ERROR
  ERROR_LOGIN = "Email/Password does not exist.",
  ERROR_LOGIN_FAIL = "Login failed! Please check Email/Password and login again.",
}
