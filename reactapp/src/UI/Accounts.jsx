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
        // expense: {
        //     expenseName: '',
        //     expenseAmount: 0,
        //     expensetype: 0,
        // },
        // exp: Expenses
    }

    constructor(){
        super();
        this.setState.loading = true;
        //this.getExpense()
        this.controller = new ExpensesController()

        // this.setState({expenses: this.controller.getExpenses()})
        // console.log(this.controller.getExpenses())
        //  console.log(this.state.expenses)
        //console.log(this.setState.expenses)
        // const data = Promise.resolve(getExpense())
        // this.setState({expenses: data});
        // console.log(this.state.expenses)
    }


    componentDidMount() {
        this.controller.getExpenses().then(({data}) => 
        this.setState({loaded: true , expenses: data})
        )
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
    
    handleEvent = (event) => {
        const name = event.target.name.value
        const amount = event.target.amount.value
        this.controller.addExpense(name, amount)
        event.preventDefault();
    }

    
    render(){
        var exp
        this.controller.getExpenses().then()
        //console.log(exp)
        //this.setState({expenses: this.controller.getExpenses()})
        // if(){
        //     this.setState({loading: false})
        //     console.log("loading...")
        // }
        // else{
        //     this.state.expenses.map(expenses => <p key={expenses.id}>{expenses.expenseName}</p>)
        // }
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