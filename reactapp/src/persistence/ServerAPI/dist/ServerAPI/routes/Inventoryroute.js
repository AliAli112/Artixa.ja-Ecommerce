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
exports.inventoryrouter = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../../config/database");
const inventoryrouter = express_1.default.Router();
exports.inventoryrouter = inventoryrouter;
inventoryrouter
    .route("/")
    // Get all items
    .get(getAllItems)
    // add new item
    .post(addItem);
inventoryrouter
    .route("/:id")
    // Get specific item
    .get(getItem)
    // Delete item from database
    .delete(deleteItem)
    // Update quantity
    .post(updateItemAmount);
// Controller functions
// Working
function getAllItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.con.query('SELECT * FROM inventory', (err, result) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            if (true) // sus
                return res.json(result);
            else
                res.json({});
        });
    });
}
function addItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { itemName, itemQuantity, itemDescription, itemCost } = req.body;
            // const newItem: Item = req.body
            const sql = `INSERT INTO inventory (itemName, itemQuantity, itemDescription, itemCost) VALUES (
            '${itemName}', '${itemQuantity}', '${itemDescription}','${itemCost}')`;
            database_1.con.query(sql);
            console.log("Item added");
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
function getItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            database_1.con.query('SELECT * FROM inventory WHERE id = ?', [id]);
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
// working
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            console.log("backend", id);
            database_1.con.query('DELETE FROM inventory WHERE id = ?', [id]);
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
// Working somewhat
function updateItemAmount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Need to implement so that it only updates quantity
        // This will also be implemented on shopping page to update quantity of item in stock whenever checkout is made
        try {
            const id = req.params.id;
            const itemAmount = req.body;
            console.log(itemAmount);
            database_1.con.query('UPDATE inventory SET itemQuantity = ? WHERE id = ?', [itemAmount, id]);
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
//# sourceMappingURL=Inventoryroute.js.map