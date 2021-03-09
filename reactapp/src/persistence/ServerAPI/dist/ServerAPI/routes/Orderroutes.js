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
exports.orderrouter = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../../config/database");
const orderrouter = express_1.default.Router();
exports.orderrouter = orderrouter;
orderrouter
    .route("/")
    // display in order collator
    .get(getAllOrders)
    // add an order to the database
    .post(addOrder);
orderrouter
    .route("/:id")
    .get()
    // delete an order
    .delete(deleteOrder);
orderrouter
    .route('/customer')
    // get customer specific orders this should maybe be post
    .get();
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.con.query('SELECT * FROM orders', (err, result) => {
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
// This needs a new route /:cusid/
function getAllMyOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const orderid = req.params.id
            const cusid = req.body; // in a hidden field pass this.Customer.getId
            database_1.con.query('SELECT * from orders WHERE cus_id = ?', [cusid], (err, result) => {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                if (true)
                    return res.json(result);
                else
                    res.json({});
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
// This function needs to take the order id and shippinglocation and make reference keys to the items
function addOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { items, shippingLocation } = req.body;
            const sql = `INSERT INTO orders (items, shippingLocation ) VALUES (
            '${items}', '${shippingLocation}')`;
            database_1.con.query(sql);
            console.log("Order added");
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
function deleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            database_1.con.query('DELETE FROM orders WHERE id = ?', [id]);
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
//# sourceMappingURL=Orderroutes.js.map