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
/*
expenserouter
    .route('/:expenseid')
    //Delete expense or revenue (cant delete expense, add negative figure)
    .delete()
*/
// Controller Functions
function getAllExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        database_1.con.query('SELECT * FROM expenses', (err, result) => {
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
function addExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newExpense = req.body;
            database_1.con.query('INSERT INTO expenses SET ?', [newExpense]);
            console.log("Successfully added");
        }
        catch (err) {
            res.status(400).send(err);
            console.log("An error occured");
        }
    });
}
//# sourceMappingURL=Expensesroute.js.map