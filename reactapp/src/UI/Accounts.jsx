import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'
import { Expenses } from '../Domain Model/Expenses'
import { ExpensesController } from '../Application/Controllers/AccountsController'

const server = axios.create()

export class AccountsPage extends Component {
//Will make this page create a incomestatement class in the constructor.
    #controller
    state = {
        loaded: false,
        expenses: [],
    }

    constructor(){
        super();
        this.controller = new ExpensesController()
    }


    componentDidMount() {
        this.controller.getExpenses().then(({data}) => 
        this.setState({loaded: true , expenses: data})
        )
    }

    // getExpense = async () => {
    //     try{
    //         let data = await server.get('http://localhost:3005/accounts').then(({data}) =>
    //         data);
    //         console.log(data)
    //         this.setState({expenses: data})
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    
    handleEvent = (event) => {
        const name = event.target.name.value
        const amount = event.target.amount.value
        const expense = new Expenses(name, amount)
        this.controller.addExpense(expense)
        event.preventDefault();
    }

    
    render(){
        
        return(
            <div>
                <h1>This is the AccountsPage</h1>
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
            </div>
        )
    }
    
}