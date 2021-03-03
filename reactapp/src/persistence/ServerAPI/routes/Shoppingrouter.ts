import express, { Request, Response } from 'express';
import { con } from '../../config/database';
import { Item } from '../../misc/Item'

const shoppingrouter = express.Router();

shoppingrouter
    .route("/")
    // Get all items
    .get(getAllItems)
    // add new item
    .post(addItem);

shoppingrouter
     .route("/:id")
     // Get specific item
     .get(getItem)
      // Delete item from database
     .delete(deleteItem)
      // Update quantity
     .post(updateItemAmount)

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

async function addItem(req: Request, res: Response){
    try{
        const { itemName, itemQuantity, itemCost } = req.body
        // const newItem: Item = req.body
        const sql = `INSERT INTO inventory (itemName, itemQuantity, itemCost) VALUES (
            '${itemName}', '${itemQuantity}', '${itemCost}')`
        con.query(sql);
        console.log("Item added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}

async function getItem(req: Request, res: Response){
    try{
        const id = req.params.id
        con.query('SELECT * FROM inventory WHERE id = ?', [id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}

async function deleteItem(req: Request, res: Response){
    try{
        const id = req.params.id
        con.query('DELETE FROM inventory WHERE id = ?', [id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }

}

async function updateItemAmount(req: Request, res: Response){
    // Need to implement so that it only updates quantity
    try{
        const id = req.params.id
        const { itemAmount } = req.body;
        con.query('UPDATE inventory SET itemQuantity WHERE id = ?', [itemAmount, id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}
export { shoppingrouter }