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
exports.Inventoryrouter = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../../config/database");
const Inventoryrouter = express_1.default.Router();
exports.Inventoryrouter = Inventoryrouter;
Inventoryrouter
    .route("/")
    // Get all items
    .get(getAllItems);
//     .post((req: Request, res: Response) => {
//     })
// Inventoryrouter
//     .route("/inventory/:itemid")
//     // Delete item from database
//     .delete((req: Request, res: Response) => {
//     })
//     // Update quantity
//     .post((req: Request, res: Response) => {
//     })
// Controller functions
function getAllItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.con.query('SELECT * FROM inventory', (err, result) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            if (true)
                return res.json(result);
            else
                res.json({});
        });
    });
}
//# sourceMappingURL=Inventory.js.map