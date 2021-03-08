"use strict";
exports.__esModule = true;
exports.con = void 0;
// const mysql = require('mysql');
var mysql_1 = require("mysql");
var con = mysql_1["default"].createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "artixa"
});
exports.con = con;
