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

}