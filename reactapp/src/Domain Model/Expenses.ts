import { ExpenseType } from './Enum';
//import moment from 'moment'


export class Expenses{
    //private id: number; // this id can remain auto
    private name: string;
    private amount: number;
    private ExpenseType: ExpenseType; // This needs to be added in database
    //public date = moment().format('MMMM Do YYYY, h:mm:ss a');

    constructor(name: string, amount: number, type: ExpenseType){
        this.name = name;
        this.amount = amount;
        this.ExpenseType = type;
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

    //new function 
    public updateAmount(amount: number){
        this.amount += amount;
    } //then store it back into the database
}
