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
exports.expenserouter = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../../config/database");
const expenserouter = express_1.default.Router();
exports.expenserouter = expenserouter;
expenserouter
    .route('/')
    // Get all expenses (do sorting on the frontend)
    .get(getAllExpense)
    // Add an expense or revenue
    .post(addExpense);
expenserouter
    .route('/:id')
    // Delete expense or revenue (cant delete expense, add negative figure)
    // get the revenue expense
    .get(getExpense)
    // update the amount in the revenue expense, most work done on frontend
    .post(updateRevenue);
// Controller Functions
function getAllExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.con.query('SELECT * FROM expenses', (err, result) => {
            if (err) {
                res.status(400).send(err);
                return;
            }
            if (result.length > 0) {
                return res.json(result);
            }
            else {
                return res.json({});
            }
        });
    });
}
function getExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        console.log(id);
        database_1.con.query(`SELECT * FROM expenses WHERE id = ?`, [id], (err, result) => {
            if (err) {
                console.log("eer");
                res.status(400).send(err);
                return;
            }
            if (result.length > 0) {
                console.log(result[0]);
                console.log("Expense with id" + id + "retrived");
                return res.json(result[0]);
            }
            else {
                console.log("aaa");
                return res.json({});
            }
        });
        // try{
        //     const id = req.params.id
        //     const data = con.query(`SELECT * from expenses WHERE id = ?`, [id]);
        //     res.json(data)
        //     console.log("Expense with id"+ id + "retrived")
        // }catch(err){
        //     res.status(400).send(err);
        //     console.log("An error occured getExpense()");
        // }
    });
}
function addExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { expenseName, expenseAmount, expensetype } = req.body;
            const sql = `INSERT INTO expenses (expenseName, expenseAmount, expensetype) VALUES (
            '${expenseName}','${expenseAmount}','${expensetype}')`;
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
function updateRevenue(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The revenue in the database will have an unique id '9999' that is updated
        try {
            const id = req.params.id;
            const { expenseAmount } = req.body;
            console.log(expenseAmount, "9999 updated");
            database_1.con.query(`UPDATE expenses SET expenseAmount = ? WHERE id = ?`, [expenseAmount, id]);
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
//# sourceMappingURL=Expensesroute.js.map