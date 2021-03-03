import express, { Request, Response } from 'express';
import { con } from '../../config/database';
import { Customer } from '../../misc/Customers'

const customerrouter = express.Router();

/*
customerrouter
    //add a customer to the database
    .route("/register")

customerrouter
    //search if the customer is in the database
    .route("/login")

customerrouter
    //get customer specific data
    .route("/:customerid")

*/

async function getAllCustomers(req: Request, res: Response) {
    //Not sure when to use this as yet
    con.query('SELECT * FROM customers', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true)
            return res.json(result);
        else res.json({});
    });
}

async function registerCustomer(req: Request, res: Response) {
    //This function will store the data received in the req body in the database.
    try{
        const { customerUsername, customerFirstName, customerLastName, customerAddress, 
            customerPhoneNumber, customerEmail, customerPassword} = req.body;
        let sql = `INSERT INTO customers (customerUsername, customerFirstName, customerLastName, 
            customerAddress, customerPhoneNumber, customerEmail, customerPassword)
            VALUES (${customerUsername}, ${customerFirstName},${customerLastName},${customerAddress},
                ${customerPhoneNumber},${customerEmail},${customerPassword})`
        con.query(sql);
        console.log(req.body)
        console.log("Successfully added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}