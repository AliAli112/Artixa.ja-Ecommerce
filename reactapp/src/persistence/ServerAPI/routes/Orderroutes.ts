import express, { Request, Response } from 'express';
import { con } from '../../config/database';

const orderrouter = express.Router()

orderrouter
    .route("/")
    .get(getAllOrders)
    // add an order to the database
    .post()

orderrouter
    .route("/:orderid")
    .get()
    // delete an order
    .delete()


async function getAllOrders(req: Request, res: Response): Promise<Response | void>{
    con.query('SELECT * FROM orders', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(true)
            return res.json(result);
        else res.json({});
    })
}

/*
This function needs to take the order id and shippinglocation and make reference keys to the items
async function addOrder(req: Request, res: Response){
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
*/

async function deleteItem(req: Request, res: Response){
    try{
        const id = req.params.itemid
        con.query('DELETE FROM orders WHERE id = ?', [id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }

}
export { orderrouter }
