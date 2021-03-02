import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'
import { Expenses } from '../Domain Model/Expenses'

const server = axios.create()

export class AccountsPage extends Component {
    state = {
        expenses: [],
        expense: {
            expenseName: '',
            expenseAmount: 0,
            expensetype: 0,
        },
        exp: Expenses
    }

    constructor(){
        super();
        this.getExpense();
    }

    createExpense(name, amount){
        console.log(name, amount)
        const expens = new Expenses(name, amount)
        console.log(expens)
        this.setState({exp: expens})
        console.log("expense created")
    }


    getExpense = async () => {
        try{
            let data = await server.get('http://localhost:3005/accounts').then(({data}) =>
            data);
            console.log(data)
            this.setState({expenses: data})
        }catch(err){
            console.log(err);
        }
    }
    
    addExpense = async (event) => {
        event.preventDefault();
        //this.createExpense(event.target.name.value, event.target.amount.value)
        const expense = new Expenses(event.target.name.value, event.target.amount.value)
        let res = await server.post('http://localhost:3005/accounts', {
            expenseName: expense.getName(),
            expenseAmount: expense.getAmount(),
            expensetype: expense.getType(),
            }).then((res) =>{
                console.log(res)
                this.getExpenses();
            })
        }
    render(){
        return(
            <div>
                <h1>This is the AccountsPage</h1>
                <h2>Income Statement</h2>
                <h3>Expenses</h3>
                {this.state.expenses.map(expenses => <p key={expenses.id}>{expenses.expenseName}</p>)}
                <h3>Add an Expense</h3>
                <form onSubmit={this.addExpense}>
                    <label>Expense Name
                    <input type='text' name='name'/>
                    </label>
                    <label>Expense Amount
                    <input type='number' name='amount'/>
                    </label>
                    <label>Expense Type
                    <input type='number' name='type'/>
                    </label>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        )
    }
}