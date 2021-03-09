import { ControlBox } from '@chakra-ui/control-box';
import axios from 'axios'
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
            return data.data
        }
        //.then(({data}) => data);
        //console.log(data)
    }catch(err){
        console.log(err);
    }
    }

    public async addExpense(name: string, amount: number){
    //this.createExpense(event.target.name.value, event.target.amount.value)
    const expense = new Expenses(name, amount)
    let res = await this.server.post('http://localhost:3005/accounts', {
        expenseName: expense.getName(),
        expenseAmount: expense.getAmount(),
        expensetype: expense.getType(),
        }).then((res) =>{
            console.log(res)
            this.getExpenses();
        })
    }

    public handleaddEvent(event: Event){

    }
}



// export function createExpense(name, amount){
//     console.log(name, amount)
//     const expens = new Expenses(name, amount)
//     console.log(expens)
//     this.setState({exp: expens})
//     console.log("expense created")
// }

// export const getExpense = async () => {
//     try{
//         let data = await server.get('http://localhost:3005/accounts').then(({data}) =>
//         data);
//         //console.log(data)
//         return data
//     }catch(err){
//         console.log(err);
//     }
// }


// export const addExpense = async (event) => {
//     event.preventDefault();
//     //this.createExpense(event.target.name.value, event.target.amount.value)
//     const expense = new Expenses(event.target.name.value, event.target.amount.value)
//     let res = await server.post('http://localhost:3005/accounts', {
//         expenseName: expense.getName(),
//         expenseAmount: expense.getAmount(),
//         expensetype: expense.getType(),
//         }).then((res) =>{
//             console.log(res)
//             this.getExpenses();
//         })
//     }
