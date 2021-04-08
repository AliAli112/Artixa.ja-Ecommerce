import { ControlBox } from '@chakra-ui/control-box';
import axios from 'axios'
import { ExpenseType } from '../../Domain Model/Enum';
import { Expenses } from '../../Domain Model/Expenses'


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

    public async addExpense(id: number,name: string, amount: number, type: ExpenseType){
    //this.createExpense(event.target.name.value, event.target.amount.value)
    const expense = new Expenses(id, name, amount, type)
    let res = await this.server.post('http://localhost:3005/accounts', {
        expenseName: expense.getName(),
        expenseAmount: expense.getAmount(),
        expensetype: expense.getType(), 
        }).then((res) =>{
            console.log(res)
            this.getExpenses();
        })
    }

    public async updateRevenue(ident: number, amount: number){
        const id = ident;
        try{
            let data = await this.server.get(`http://localhost:3005/accounts/${id}`);
            if(data.status === 200){
                return data
            }
            const revenue = data.data[0] //gets the revenue with special id 9999
            const expense = new Expenses(revenue.id, revenue.expenseName, revenue.expenseAmount, revenue.expensetype)
            expense.updateAmount(amount) //updated the revenue amount
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

