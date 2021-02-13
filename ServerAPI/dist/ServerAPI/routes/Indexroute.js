"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexrouter = void 0;
const express_1 = __importDefault(require("express"));
const indexrouter = express_1.default.Router();
exports.indexrouter = indexrouter;
indexrouter
    .route("/")
    .get((req, res) => {
    res.send("/inventory for INVENTORY");
});
//# sourceMappingURL=Indexroute.js.map