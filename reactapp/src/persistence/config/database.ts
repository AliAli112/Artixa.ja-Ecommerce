// const mysql = require('mysql');
import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Artixa"
});
export { con }