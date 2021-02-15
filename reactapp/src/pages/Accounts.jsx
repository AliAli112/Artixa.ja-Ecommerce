import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
//import { Button, Title } from 'react-bootstrap'
import axios from 'axios'

const server = axios.create()

export class AccountsPage extends Component {
    state = {
        expenses: [],
        expense: {
            expenseName: '',
            expenseAmount: 0,
            expensetype: 0,
        } 
    }

    constructor(){
        super();
        this.getExpense();
    }
    getExpense = async () => {
        try{
            let data = await server.get('http://localhost:3005/accounts').then(({data}) =>
            data);
            this.setState({expenses: data})
        }catch(err){
            console.log(err);
        }
    }

    addExpense = async () => {
        let res = await server.post('http://localhost:3005/accounts', {
            expenseName: 'Water',
            expenseAmount: 22222,
            expensetype: 0,
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
                {this.state.expenses.map(expenses => <p key={expenses.id}>{expenses.expenseName}</p>)}
                <button onClick={this.addExpense}>Add the expense</button>
            </div>
        )
    }
}