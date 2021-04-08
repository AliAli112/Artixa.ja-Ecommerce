import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'
import { Expenses } from '../Domain Model/Expenses'
import { ExpensesController } from '../Application/Controllers/AccountsController'
import './styles/accounts.css';

const server = axios.create()

export class AccountsPage extends Component {
//Will make this page create a incomestatement class in the constructor.
    #controller
    state = {
        expenses: [],
        typ: 0
    }

    constructor(){
        super()
        this.controller = new ExpensesController();
    }

    componentDidMount(){
        this.controller.getExpenses().then(({data})=>{
            let nExpenses = []
            for(let i=0;i<data.length;i++){
                let expense = new Expenses(data[i]["id"],data[i]["expenseName"],data[i]["expenseAmount"],data[i]["expensetype"])
                nExpenses.push(expense)
            }
            this.setState({expenses: nExpenses})
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

    openClose(){
        let div = document.getElementById("red-row");
        let button = document.getElementById("open");
        if(div.classList.contains("hidden")){       
            div.classList.remove("hidden")
            button.innerHTML = "Close Edit"
        }else{
            div.classList.add("hidden");
            button.innerHTML = "Edit Revenue"
        }
    }
    editRevenue = () =>{
        let inputs = Array.from(document.getElementsByClassName("revEdits"))
        for(let i=0;i<inputs.length;i++){
            if(inputs[i].value.length == 0){
                console.log("empty");
            }else{
                this.controller.updateRevenue(inputs[i].getAttribute("id"),inputs[i].value);
                // window.location.reload(true);
            }
        }
    }

    
    render(){
        
        return(
            <div>
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
                                <h3>{expense.getAmount()}</h3>
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
                                <h3>{expense.getAmount()}</h3>
                            )}
                        </span>
                    </div>
                    <div className="exp-row">
                        <h2>Net Income</h2>
                        <span className="exp-col">-----------</span>
                        <span className="exp-col">
                            <h3>$14,000</h3>
                        </span>
                    </div>
                </div>

                <form onSubmit={this.handleEvent}>
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
                <button id="open" onClick={this.openClose}>Edit Revenue</button>
                <div id="red-row" className="hidden">
                    <span className="red-col">
                        {this.state.expenses.filter(expense => expense.getType()==1).map(expense =>
                        <h3>{expense.getName()}</h3>)}
                    </span>
                    <span className="red-col">
                        {this.state.expenses.filter(expense => expense.getType()==1).map(expense =>
                            <input className="revEdits" id={expense.getId()} type="number" name="amount" placeholder={expense.getAmount()}/>
                        )}
                    </span>
                    <button onClick={()=>this.editRevenue()} id="save">Save</button>    
                </div>
            </div>
        )
    }
    
}