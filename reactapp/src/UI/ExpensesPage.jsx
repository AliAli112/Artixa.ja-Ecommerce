import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'
import { Expenses } from '../Domain Model/Expenses'
import { ExpensesController } from '../Application/Controllers/AccountsController'

const server = axios.create()

export class ExpensesPage extends Component{
    state = {
        expenses: []
    }

    constructor(){
        super()
        this.controller = new ExpensesController();
    }

    componentDidMount(){
        this.controller.getExpenses().then(({data})=>{
            let nExpenses = []
            for(let i=0;i<data.length;i++){
                let expense = new Expenses(data[i]["expenseName"],data[i]["expenseAmount"],data[i]["expensetype"])
                nExpenses.push(expense)
            }
            this.setState({expenses: nExpenses})
        })
    }

    render(){
        return(
            <div>
                <h2>Expenses</h2>
                {this.state.expenses.map(expense => 
                    <div className="order-col-head">
                        <h2>{expense.getName()}</h2>
                        <h2>{expense.getAmount()}</h2>
                    </div>
                )}
            </div>
        )
    }
}