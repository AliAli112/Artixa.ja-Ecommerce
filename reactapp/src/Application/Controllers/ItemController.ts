import { Item } from '../../Domain Model/Item'
import axios from 'axios'


export class ItemsController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public getallItems = async () =>{
        try{
            console.log("Controller get all items")
            let data = await this.server.get('http://localhost:3005/inventory');
            console.log(data)
            if(data.status === 200){
                return data
            }
        }catch(e){
            console.log(e)
        }
    }

    public getItem = async (id: number) => {
        try{
            let data = await this.server.get(`http://localhost:3005/inventory/${id}`).then(({data}) => 
            data);
            console.log(data)
            if(data.status === 200){
                return data
            }
        }catch(err){

        }
    }

    public addItem = async (item: Item) => {
        try{
            let res = await this.server.post('http://localhost:3005/inventory', {
                itemName: item.getName(),
                itemQuantity: item.getQuantity(),
                itemDescription: item.getDescription(),
                itemCost: item.getCost(),
            }).then((res) =>{
                console.log(res)
            });
        }catch(e){
            console.log(e)
        }
    }

    public deleteItem = async (id: number) => {
        try{
            let res = await this.server.delete(`http://localhost:3005/inventory/${id}`).then(); 
            
        }catch(err){
            console.log(err)
        }
    }

    public updateItemAmount = async (id: number, amount: number) => {
        //amount would be the new number of items being stored in the inventory, so totalamount - quantitysold
        try{
            let res = await this.server.post(`http://localhost:3005/inventory/${id}`, {
                itemName: '',
                itemQuantity: amount,
            }).then();
        }catch(err){
            console.log(err)
        }
    }
}

//A function which stores the orders in the order table is needed