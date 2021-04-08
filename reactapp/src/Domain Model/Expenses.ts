import { ExpenseType } from './Enum';
//import moment from 'moment'


export class Expenses{
    //private id: number; // this id can remain auto
    private id: number;
    private name: string;
    private amount: number;
    private ExpenseType: ExpenseType; // This needs to be added in database
    //public date = moment().format('MMMM Do YYYY, h:mm:ss a');

    constructor(id: number, name: string, amount: number, type: ExpenseType){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.ExpenseType = type;
    }

    public getId(){
        return this.id;
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

    public updateAmount(amount: number){
        this.amount += amount;
    }
}
