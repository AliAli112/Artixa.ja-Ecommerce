import { ExpenseType } from './Enum';
//import moment from 'moment'


export class Expenses{
    //private id: number; // this id can remain auto
    private name: string;
    private amount: number;
    private ExpenseType: ExpenseType; // This needs to be added in database
    //public date = moment().format('MMMM Do YYYY, h:mm:ss a');

    constructor(name: string, amount: number){
        this.name = name;
        this.amount = amount;
        this.ExpenseType = 0;
    }

    public getName(){
        return this.name;
    }
    public getAmount(){
        return this.amount;
    }
    public getType(){
        return this.ExpenseType;
    }

    public setName(name: string){
        this.name = name;
    }
    public setAmount(sum: number){
        this.amount = sum;
    }

    public setType(type: ExpenseType){
        this.ExpenseType = type ;
    }

    //new function 
    public updateAmount(amount: number){
        this.amount += amount;
    } //then store it back into the database
}
