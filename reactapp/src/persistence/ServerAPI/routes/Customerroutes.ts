import express, { Request, Response } from 'express';
import { con } from '../../config/database';
import { Customer } from '../../misc/Customers'

const customerrouter = express.Router();


customerrouter
    // add a customer to the database
    .route("/register")
    .post(registerCustomer)

customerrouter
    // search if the customer is in the database
    .route("/login")
    .post(loginCustomer)

customerrouter
    // get customer specific data like email and address to auto fill out form
    .route("/:id")
    .get(getCustomer)



async function loginCustomer(req: Request, res: Response) {
    try{
        console.log(req.body)
        const { customerEmail, customerPassword } = req.body
        console.log(customerEmail, customerPassword)
        con.query('SELECT * FROM customers WHERE customerEmail = ? AND customerPassword = ?',
         [customerEmail, customerPassword], (err, result) => {
             if(err){
                 console.log('not in database')
                 res.send({err})
             }
             if(true){
                console.log("Customer logged in");
                 return res.json(result)
             }
         } );
    }catch(e){
        console.log(e)
    }
}

async function registerCustomer(req: Request, res: Response) {
    // This function will store the data received in the req body in the database.
    try{
        const { customerUsername, customerFirstName, customerLastName, customerAddress,
            customerPhoneNumber, customerEmail, customerPassword} = req.body;
        const sql = `INSERT INTO customers (customerUsername, customerFirstName, customerLastName,
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
async function getCustomer(req: Request, res: Response) {
    try{
        const cusid = req.params.id
        con.query('SELECT * from customers WHERE cus_id = ?', [cusid],
        (err, result) => {
            if(err){
                res.send({err})
            }
            if(true){
                return res.json(result)
            }
        });
    }catch(e){
        console.log(e)
    }
}

export { customerrouter }