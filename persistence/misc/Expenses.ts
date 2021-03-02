import { ExpenseType } from './Enum';
import moment from 'moment'

export class Expenses{
    private id: number; // this id can remain auto
    private name: string;
    private amount: number;
    private ExpenseType: ExpenseType; // This needs to be added in database
    public date = moment().format('MMMM Do YYYY, h:mm:ss a');

    constructor(name: string, amount: number){
        this.name = name;
        this.amount = amount;
    }

    public setType(type: ExpenseType){
        this.ExpenseType = type ;
    }
}