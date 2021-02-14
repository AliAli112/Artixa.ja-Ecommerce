import express, { Request, Response } from 'express';
import { con } from '../../config/database';
import { Expenses } from '../../misc/Expenses'

const expenserouter = express.Router();

expenserouter
    .route('/')
    // Get all expenses (do sorting on the frontend)
    .get(getAllExpense)
    // Add an expense or revenue
    .post(addExpense)

/*
expenserouter
    .route('/:expenseid')
    //Delete expense or revenue (cant delete expense, add negative figure)
    .delete()
*/

// Controller Functions

async function getAllExpense(req: Request, res: Response) {
    con.query('SELECT * FROM expenses', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true)
            return res.json(result);
        else res.json({});
    });
}

async function addExpense(req: Request, res: Response){
    try{
        const newExpense: Expenses = req.body
        con.query('INSERT INTO expenses SET ?', [newExpense]);
        console.log("Successfully added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}
export { expenserouter }