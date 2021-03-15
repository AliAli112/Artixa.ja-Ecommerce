// const mysql = require('mysql');
import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "user1",
    password: "access12",
    database: "Artixa"
});
export { con }