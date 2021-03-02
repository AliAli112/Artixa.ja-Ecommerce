"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expenses = void 0;
const moment_1 = __importDefault(require("moment"));
class Expenses {
    constructor(name, amount) {
        this.date = moment_1.default().format('MMMM Do YYYY, h:mm:ss a');
        this.name = name;
        this.amount = amount;
    }
    setType(type) {
        this.ExpenseType = type;
    }
}
exports.Expenses = Expenses;
//# sourceMappingURL=Expenses.js.map