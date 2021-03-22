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


expenserouter
    .route('/:id')
    // Delete expense or revenue (cant delete expense, add negative figure)
    // get the revenue expense
    .get(getExpense)
    // update the amount in the revenue expense, most work done on frontend
    .post(updateRevenue)


// Controller Functions

async function getAllExpense(req: Request, res: Response) {
    con.query('SELECT * FROM expenses', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(result.length > 0){
            return res.json(result);
        }else{
            return res.json({})
        }
    });
}

async function getExpense(req: Request, res: Response): Promise<Response | void>{
    try{
        const id = req.params.id
        con.query(`SELECT * from expenses WHERE id = ?`, [id])
        console.log("Expense with id"+ id + "retrived")
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}

async function addExpense(req: Request, res: Response){
    try{
        const { expenseName, expenseAmount , expensetype} = req.body
        const sql = `INSERT INTO expenses (expenseName, expenseAmount, expensetype) VALUES (
            '${expenseName}','${expenseAmount}','${expensetype}')`
    con.query(sql);
        console.log(req.body)
        console.log("Successfully added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}

async function updateRevenue(req:Request, res: Response){
    // The revenue in the database will have an unique id '9999' that is updated
    try{
        const id = req.params.id
        const {expenseAmount} = req.body
        con.query(`UPDATE expenses SET expenseAmount = ? WHERE id = ?`, [expenseAmount, id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}
export { expenserouter }