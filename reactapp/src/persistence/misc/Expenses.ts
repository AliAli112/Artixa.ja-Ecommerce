import { ExpenseType } from './Enum';
import moment from 'moment'

export interface Expenses{
    id: number; // this id can remain auto
    name: string;
    amount: number;
    ExpenseType: ExpenseType; // This needs to be added in database
}
// = moment().format('MMMM Do YYYY, h:mm:ss a');