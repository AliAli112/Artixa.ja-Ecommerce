"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
// const mysql = require('mysql');
const mysql_1 = __importDefault(require("mysql"));
const con = mysql_1.default.createConnection({
    host: "localhost",
    user: "user1",
    password: "access12",
    database: "Artixa"
});
exports.con = con;
//# sourceMappingURL=database.js.map