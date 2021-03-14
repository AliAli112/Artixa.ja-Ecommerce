import { Item } from './Item'
import { Customer } from './Customers'
import { OrderStatus } from './Enum'

export class Order {
    private id: number;
    private ownerid: number; //id of the customer
    private items: Item[];
    private shippingLocation: string; //Needs to be added to class diagram
    public status: OrderStatus;
    private total: number;
    //private timestamp: Date.now() //Needs to be included in database in original app.

    constructor(id: number, ownerid: number, items: Item[], location: string, stat: OrderStatus, total: number = 0){
        this.id = id; 
        this.ownerid = ownerid;
        this.items = items;
        this.shippingLocation = location;
        this.status = stat;
        this.total = total;
    }

    public addItem(newitem: Item){
        this.items.push(newitem); //If push doesnt work try something else
    }

    public removeItem(){
        this.items.pop();
    }

    public getItems(){
        return this.items;
    }


    public getCustomerID(){
        return this.ownerid
    }

    public getStatus(){
        return this.status;
    }

    public calcTotal(){
        return this.total;
    }
    
    public getLocation(){
        return this.shippingLocation
    }

    public getTotal(){
        return this.total;
    }
}

