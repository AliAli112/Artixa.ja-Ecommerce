import express, { Request, Response } from 'express';
import { con } from '../../config/database';
import { Item } from '../../misc/Item'

const inventoryrouter = express.Router();

inventoryrouter
    .route("/")
    // Get all items
    .get(getAllItems)
    // add new item
    .post(addItem);

inventoryrouter
     .route("/:id")
     // Get specific item
     .get(getItem)
      // Delete item from database
     .delete(deleteItem)
      // Update quantity
     .post(updateItemAmount)



// Controller functions

// Working
async function getAllItems(req: Request, res: Response): Promise<Response | void>{
    con.query('SELECT * FROM inventory', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true) // sus
            return res.json(result);
        else res.json({});
    })
}

async function addItem(req: Request, res: Response){
    try{
        const { itemName, itemQuantity, itemDescription, itemCost } = req.body
        // const newItem: Item = req.body
        const sql = `INSERT INTO inventory (itemName, itemQuantity, itemDescription, itemCost) VALUES (
            '${itemName}', '${itemQuantity}', '${itemDescription}','${itemCost}')`
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
// working
async function deleteItem(req: Request, res: Response){
    try{
        const id = req.params.id
        console.log("backend" ,id)
        con.query('DELETE FROM inventory WHERE id = ?', [id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }

}

// Working somewhat
async function updateItemAmount(req: Request, res: Response){
    // Need to implement so that it only updates quantity
    // This will also be implemented on shopping page to update quantity of item in stock whenever checkout is made
    try{
        const id = req.params.id
        const itemAmount  = req.body;
        console.log(itemAmount)
        con.query('UPDATE inventory SET itemQuantity = ? WHERE id = ?', [itemAmount, id]);

    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}
export { inventoryrouter }