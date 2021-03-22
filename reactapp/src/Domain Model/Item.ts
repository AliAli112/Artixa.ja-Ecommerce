export class Item {
    private id: number;
    private name: string;
    private description: string;
    // private image: string;
    private quantity: number;
    private cost: number;
    //muust add field which holds the total amount of items sold
    constructor(id:number, name:string, desc: string, quantity:number, cost:number ){

        this.id = id;
        this.name = name;
        this.description = desc;
        this.quantity = quantity;
        this.cost = cost;
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public getDescription(){
        return this.description;
    }

    public getQuantity(){
        return this.quantity;
    }

    public getCost(){
        return this.cost;
    }

    public updateQuantity(amount: number){
        this.quantity += amount
    }
}

