import { ExpenseType } from './Enum';
//import moment from 'moment'


export class Expenses{
    //private id: number; // this id can remain auto
    private title: string;
    private amount: number;
    private ExpenseType: ExpenseType; // This needs to be added in database
    //public date = moment().format('MMMM Do YYYY, h:mm:ss a');

    constructor(name: string, amount: number){
        this.title = name;
        this.amount = amount;
        this.ExpenseType = 0;
    }

    public getName(){
        return this.title;
    }
    public getAmount(){
        return this.amount;
    }
    public getType(){
        return this.ExpenseType;
    }

    public setName(name: string){
        this.title = name;
    }
    public setAmount(sum: number){
        this.amount = sum;
    }

    public setType(type: ExpenseType){
        this.ExpenseType = type ;
    }
}
