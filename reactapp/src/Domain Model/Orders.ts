import { Item } from './Item'
import { Customer } from './Customers'
import { OrderStatus } from './Enum'

export class Order {
    private id: number;
    private ownerid: number; //id of the customer
    private items: Item[];
    public status: OrderStatus;
    //private timestamp: Date.now() //Needs to be included in database in original app.

    constructor(id: number, items: Item[], ownerid: number, stat: OrderStatus){
        this.id = id; 
        this.items = items;
        this.ownerid = ownerid;
        this.status = stat
    }

    public addItem(newitem: Item){
        this.items.push(newitem); //If push doesnt work try something else
    }

    public removeItem(){
        this.items.pop();
    }

    public getCustomerID(){
        return this.ownerid
    }

    public getStatus(){
        return this.status;
    }
}

