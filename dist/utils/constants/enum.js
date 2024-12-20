"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_ENUM = exports.ROLE_ENUM = void 0;
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
})(MESSAGE_ENUM || (exports.MESSAGE_ENUM = MESSAGE_ENUM = {}));
//# sourceMappingURL=enum.js.map