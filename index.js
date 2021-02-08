const { required } = require("joi");

var express = require('express');
var app = express();
var cors = require('cors');
var port = process.env.PORT || 3005;

//This allows use to access our api from a remote server since react is in another server
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.get('/Customers', (req, res) =>{
    let sql = 'SELECT * FROM customers';
})

app.listen(port, () => {
    console.log("Listening at http://localhost:3005");
});