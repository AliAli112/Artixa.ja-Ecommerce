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
exports.customerrouter = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../../config/database");
const customerrouter = express_1.default.Router();
exports.customerrouter = customerrouter;
customerrouter
    // add a customer to the database
    .route("/register")
    .post(registerCustomer);
customerrouter
    // search if the customer is in the database
    .route("/login")
    .post(loginCustomer);
customerrouter
    // get customer specific data like email and address to auto fill out form
    .route("/:id")
    .get(getCustomer);
customerrouter
    .route("/authenticate")
    .post(authenticateCustomer);
customerrouter
    .route('/')
    .post(updateCustomerOrders);
function loginCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { customerEmail } = req.body;
            console.log(customerEmail);
            database_1.con.query('SELECT * FROM customers WHERE customerEmail = ?', [customerEmail], (err, result) => {
                if (err) {
                    console.log('not in database');
                    res.send({ err });
                }
                if (result.length > 0) {
                    console.log("Customer found");
                    return res.json(result);
                }
                else {
                    return res.json({});
                }
            });
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
function registerCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // This function will store the data received in the req body in the database.
        try {
            console.log(req.body);
            const { customerFirstName, customerLastName, customerAddress, customerPhoneNumber, customerEmail, customerPassword } = req.body;
            const sql = `INSERT INTO customers (customerFirstName, customerLastName,
            customerAddress, customerPhoneNumber, customerEmail, customerPassword)
            VALUES ('${customerFirstName}','${customerLastName}','${customerAddress}',
                '${customerPhoneNumber}','${customerEmail}','${customerPassword}')`;
            database_1.con.query(sql);
            console.log(req.body);
            console.log("Successfully added");
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
function getCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cusid = req.params.id;
            database_1.con.query('SELECT * from customers WHERE cus_id = ?', [cusid], (err, result) => {
                if (err) {
                    res.send({ err });
                }
                if (true) {
                    return res.json(result);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
function authenticateCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { customerEmail, customerPassword } = req.body;
            console.log(customerEmail, customerPassword);
            database_1.con.query('SELECT * FROM customers WHERE customerEmail = ? AND customerPassword = ?', [customerEmail, customerPassword], (err, result) => {
                if (err) {
                    console.log('not in database');
                    res.send({ err });
                }
                if (result.length > 0) {
                    console.log("Customer found auth");
                    return res.json(result);
                }
                else {
                    return res.json({});
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
function updateCustomerOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { cus_id, customerOrders } = req.body;
            database_1.con.query('UPDATE customers SET customerOrders = ? WHERE cus_id = ?', [customerOrders, cus_id]);
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
//# sourceMappingURL=Customerroutes.js.map