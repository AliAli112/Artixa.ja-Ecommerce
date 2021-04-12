import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'
import { Expenses } from '../Domain Model/Expenses'
import { ExpensesController } from '../Application/Controllers/AccountsController'
import { queryHelpers } from '@testing-library/dom'
import { Routes } from '../Domain Model/Routes'

const server = axios.create()

export class AccountsPage extends Component {
//Will make this page create a income statement class in the constructor.
    #controller
    state = {
        expenses: []
    }

    constructor(){
        super();
        this.controller = new ExpensesController()
    }


    componentDidMount() {
        this.controller.getExpenses().then(({data}) => 
        {
            
            let tExpenses = [];
            for(let i=0;i<data.length;i++){
            let exp = new Expenses(data[i]["expenseName"],data[i]["expenseAmount"], data[i]["expenseType"])
            tExpenses.push(exp)
            }
        
            this.setState({expenses: tExpenses})
    })
    }
    
    handleEvent = (event) => {
        const name = event.target.name.value
        const amount = event.target.amount.value
        const type = event.target.type.value
        const expense = new Expenses(name, amount, type)
        this.controller.addExpense(expense)
        event.preventDefault();
    }

    
    render(){
        
        return(
            <div>
                <h1>This is the Accounts Page</h1>
                <h2>Income Statement</h2>
                <h3>Expenses</h3>
                {this.state.expenses.map(expenses => <p key={expenses.id}>{expenses.expenseName}</p>)}
                <h3>Add an Expense</h3>
                <form onSubmit={this.handleEvent}>
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
                <h3>Expenses</h3>
                {this.state.expenses.map(expense => 
                    <div>

                        <h4>{expense.getName()} </h4>
                        <h4>{expense.getAmount()} </h4>
                        <h4>{expense.getType()} </h4>

                    </div>
                    )}
                


            </div>
        )
    }
    
}