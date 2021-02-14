export class Item {
    private id: number;
    private name: string;
    // private image: string;
    private quantity: number;
    private description: string;

    constructor(id:number, name:string, quantity:number, desc:string ){

        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = desc;
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

    public getDesc(){
        return this.description;
    }

    public updateQuantity(amount: number){
        this.quantity += amount
    }
}

