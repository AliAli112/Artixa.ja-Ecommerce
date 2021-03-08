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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.orderrouter = void 0;
var express_1 = require("express");
var database_1 = require("../../config/database");
var orderrouter = express_1["default"].Router();
exports.orderrouter = orderrouter;
orderrouter
    .route("/")
    .get(getAllOrders)
    // add an order to the database
    .post();
orderrouter
    .route("/:orderid")
    .get()["delete"]();
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            database_1.con.query('SELECT * FROM orders', function (err, result) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                if (true)
                    return res.json(result);
                else
                    res.json({});
            });
            return [2 /*return*/];
        });
    });
}
/*
This function needs to take the order id and shippinglocation and make reference keys to the items
async function addOrder(req: Request, res: Response){
    try{
        const { itemName, itemQuantity, itemCost } = req.body
        // const newItem: Item = req.body
        const sql = `INSERT INTO inventory (itemName, itemQuantity, itemCost) VALUES (
            '${itemName}', '${itemQuantity}', '${itemCost}')`
        con.query(sql);
        console.log("Item added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}
*/
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            try {
                id = req.params.itemid;
                database_1.con.query('DELETE FROM orders WHERE id = ?', [id]);
            }
            catch (err) {
                res.status(400).send(err);
                console.log("An error occured");
            }
            return [2 /*return*/];
        });
    });
}
