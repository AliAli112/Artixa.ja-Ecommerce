import express, { Request, Response } from 'express';
import { con } from '../../config/database';

const orderrouter = express.Router()

orderrouter
    .route("/")
    // display in order collator
    .get(getAllOrders)
    // add an order to the database
    .post(addOrder)

orderrouter
    .route("/:id")
    .get()
    // delete an order
    .delete(deleteOrder)

orderrouter
    .route('/customer')
    // get customer specific orders this should maybe be post
    .get()



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


// This needs a new route /:cusid/
async function getAllMyOrders(req: Request, res: Response) {
    try{
        // const orderid = req.params.id
        const cusid = req.body // in a hidden field pass this.Customer.getId
        con.query('SELECT * from orders WHERE cus_id = ?', [cusid],
        (err, result) => {
            if(err) {
                res.status(400).send(err);
                return;
            }
            if(true)
                return res.json(result);
            else res.json({});
        });
    }catch(e){
        console.log(e)
    }
}


// This function needs to take the order id and shippinglocation and make reference keys to the items
async function addOrder(req: Request, res: Response){
    try{
        console.log(req.body)
        const { items, shippingLocation } = req.body
        const sql = `INSERT INTO orders (items, shippingLocation ) VALUES (
            '${items}', '${shippingLocation}')`
        con.query(sql);
        console.log("Order added");
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }
}

async function deleteOrder(req: Request, res: Response){
    try{
        const id = req.params.id
        con.query('DELETE FROM orders WHERE id = ?', [id]);
    }catch(err){
        res.status(400).send(err);
        console.log("An error occured");
    }

}
export { orderrouter }
