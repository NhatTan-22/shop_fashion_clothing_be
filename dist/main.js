"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("~/config/connect"));
const helper_1 = require("~/utils/constants/helper");
const index_routes_1 = __importDefault(require("./routers/index.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/public", express_1.default.static("public"));
// body-parser
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
(0, index_routes_1.default)(app);
app
    .listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connect_1.default)();
    const admin = yield (0, helper_1.createAdminUser)();
    console.log({
        db: `${result}`,
        server: `Server is listening on port http://localhost:${port}`,
        tkAdmin: `${admin}`,
    });
}))
    .on("error", (err, req, res) => {
    res
        .status(500)
        .json({ message: `Error occurred while starting the server: ${err}` });
});
//# sourceMappingURL=main.js.map