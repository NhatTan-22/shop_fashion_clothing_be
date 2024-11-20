"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_ENUM = exports.ROLE_ENUM = void 0;
var ROLE_ENUM;
(function (ROLE_ENUM) {
    ROLE_ENUM["ADMIN"] = 1;
    ROLE_ENUM["USER"] = 0;
})(ROLE_ENUM || (exports.ROLE_ENUM = ROLE_ENUM = {}));
var MESSAGE_ENUM;
(function (MESSAGE_ENUM) {
    MESSAGE_ENUM["ERROR_LOGIN_EMAIL"] = "Email/Password does not exist.";
    MESSAGE_ENUM["ERROR_LOGIN"] = "Login failed! Please check Email/Password and login again.";
})(MESSAGE_ENUM || (exports.MESSAGE_ENUM = MESSAGE_ENUM = {}));
//# sourceMappingURL=enum.js.map