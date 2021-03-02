export class Item {
    private id: number;
    private name: string;
    // private image: string;
    private quantity: number;
    private cost: number;

    constructor(id:number, name:string, quantity:number, desc:number ){

        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.cost = desc;
        //description to the database
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public getQuantity(){
        return this.quantity;
    }

    public getCostS(){
        return this.cost;
    }

    public updateQuantity(amount: number){
        this.quantity += amount
    }
}

