import { ControlBox } from '@chakra-ui/control-box';
import axios from 'axios'
import { ExpenseType } from '../../Domain Model/Enum';
import { Expenses } from '../../Domain Model/Expenses'
import { Orders } from '../../persistence/misc/Orders';
import { OrdersController } from './OrdersController';


export class ExpensesController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public async getExpenses() {
        try{
        let data = await this.server.get('http://localhost:3005/accounts');
        if (data.status === 200){
            return data
        }
    }catch(err){ 
        console.log(err);
    }
    }

    public async addExpense(name: string, amount: number, type: ExpenseType){
    //this.createExpense(event.target.name.value, event.target.amount.value)
    const expense = new Expenses(name, amount, type)
    let res = await this.server.post('http://localhost:3005/accounts', {
        expenseName: expense.getName(),
        expenseAmount: expense.getAmount(),
        expensetype: expense.getType(), 
        }).then((res) =>{
            console.log(res)
            this.getExpenses();
        })
    }

    public async updateRevenue(amount: number){
        const id = 9999;
        console.log("update 9999")
        try{
            let data = await this.server.get(`http://localhost:3005/accounts/${id}`);
            if(data.status === 200){
                console.log(data)
            }
            const revenue = data.data //gets the revenue with special id 9999
            const expense = new Expenses(revenue.expenseName, revenue.expenseAmount, revenue.expensetype)
            console.log(expense, amount)
            expense.updateAmount(amount) //updated the revenue amount
            console.log(expense)
            let res = await this.server.post(`http://localhost:3005/accounts/${id}`, {
                //store the revenue back into the database
                expenseName: expense.getName(),
                expenseAmount: expense.getAmount(), 
                expenseType: expense.getType()
            }).then((res) =>{
                console.log(res)
            })
        }catch(err){
            console.log(err);
        }
    }

}

