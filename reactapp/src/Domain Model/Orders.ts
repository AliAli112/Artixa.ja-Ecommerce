import { Item } from './Item'
import { Customer } from './Customers'
import { OrderStatus } from './Enum'

export class Order {
    private id: number;
    private owner: Customer
    private items: Item[];
    public status: OrderStatus;
    //private timestamp: Date.now() //Needs to be included in database in original app.

    constructor(id: number, items: Item[], owner: Customer, stat: OrderStatus){
        this.id = id;
        this.items = items;
        this.owner = owner;
        this.status = stat
    }

    public addItem(newitem: Item){
        this.items.push(newitem); //If push doesnt work try something else
    }

    public removeItem(){
        this.items.pop();
    }

    public getCustomer(){
        return this.owner
    }

    public getStatus(){
        return this.status;
    }
}

