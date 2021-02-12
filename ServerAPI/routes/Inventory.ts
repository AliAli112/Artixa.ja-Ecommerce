import express, { Request, Response } from 'express';
import { con } from '../../config/database';

const Inventoryrouter = express.Router();

Inventoryrouter
    .route("/")
    // Get all items
    .get(getAllItems);
//     .post((req: Request, res: Response) => {

//     })

// Inventoryrouter
//     .route("/inventory/:itemid")
//     // Delete item from database
//     .delete((req: Request, res: Response) => {

//     })
//     // Update quantity
//     .post((req: Request, res: Response) => {

//     })

// Controller functions

async function getAllItems(req: Request, res: Response): Promise<Response | void>{
    con.query('SELECT * FROM inventory', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true)
            return res.json(result);
        else res.json({});
    })
}

export { Inventoryrouter }