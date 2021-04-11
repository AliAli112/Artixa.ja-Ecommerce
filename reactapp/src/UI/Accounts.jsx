import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'
import { OrdersController } from '../Application/Controllers/OrdersController'
import { Expenses } from '../Domain Model/Expenses'
import { ExpensesController } from '../Application/Controllers/AccountsController'
import './styles/accounts.css';
import { NavbarAdmin } from './NavBar/Navbar'

const server = axios.create()

export class AccountsPage extends Component {
//Will make this page create a incomestatement class in the constructor.
    #controller
    state = {
        orderNumber: 0,
        expenses: [],
        revTotal: 0,
        typ: 0
    }

    constructor(){
        super()
        this.controller = new ExpensesController();
        this.ordersControl = new OrdersController();
    }

    componentDidMount(){
        this.controller.getExpenses().then(({data})=>{
            let nExpenses = []
            let total = 0;
            for(let i=0;i<data.length;i++){
                if(data[i]["expensetype"]==1){
                    total += data[i]["expenseAmount"];
                }else{
                    total -= data[i]["expenseAmount"];
                }
                let expense = new Expenses(data[i]["expenseName"],data[i]["expenseAmount"],data[i]["expensetype"])
                nExpenses.push(expense)
            }
            this.setState({expenses: nExpenses})
            this.setState({revTotal: total})
        })
        this.ordersControl.getOrders().then(({data})=>{
            let number = data.length;
            this.setState({orderNumber: number})
        })
    }
    
    handleEvent = (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const amount = event.target.amount.value
        const type = event.target.type.value
        if(type.toLowerCase() == "revenue"){
            this.state.typ = 1;
        } else if(type.toLowerCase() == "expense"){
            this.state.typ = 0;
        }
        this.controller.addExpense(name, amount, this.state.typ)
        window.location.reload(true);
    }

    
    render(){
        return(
            <div>
                <NavbarAdmin/>
                <h1>Income Statements</h1>
                <div className="expenses">
                    <div className="exp-row">
                        <h2>Revenue</h2>
                        <span className="exp-col">
                            {this.state.expenses.filter(expense=>expense.getType()==1).map(expense =>
                                <h3>{expense.getName()}</h3>
                            )}
                        </span>
                        <span className="exp-col">
                            {this.state.expenses.filter(expense=>expense.getType()==1).map(expense =>
                                <h3>{"$"+expense.getAmount().toString()}</h3>
                            )}
                        </span>
                    </div>
                    <div className="exp-row">
                        <h2>Expenses</h2>
                        <span className="exp-col">
                            {this.state.expenses.filter(expense=>expense.getType()==0).map(expense =>
                                <h3>{expense.getName()}</h3>
                            )}
                        </span>
                        <span className="exp-col">
                            {this.state.expenses.filter(expense=>expense.getType()==0).map(expense =>
                                <h3>{"$"+expense.getAmount().toString()}</h3>
                            )}
                        </span>
                    </div>
                    <div className="exp-row">
                        <h2>Net Income</h2>
                        <span className="exp-col">-----------</span>
                        <span className="exp-col">
                            <h3>{"$"+Math.abs(this.state.revTotal).toString()}</h3>
                        </span>
                    </div>
                    <div className="exp-row">
                        <h2>Marginal Revenue</h2>
                        <span className="exp-col">-----------</span>
                        <span className="exp-col">
                            <h3>{"$"+Math.abs(this.state.revTotal/this.state.orderNumber).toFixed(3).toString()}</h3>
                        </span>
                    </div>
                </div>

                <form id="rev-input" onSubmit={this.handleEvent}>
                    <label>Expense Name
                    <input type='text' name='name' placeholder="Enter name of the expense"/>
                    </label>
                    <label>Expense Amount
                    <input type='number' name='amount' placeholder="Enter the Amount"/>
                    </label>
                    <label>Expense Type
                    <input type='text' name='type' placeholder="Revenue or Expense"/>
                    </label>
                    <input id ="submit" type='submit' value='Submit'/>
                </form>

            </div>
        )
    }
    
}