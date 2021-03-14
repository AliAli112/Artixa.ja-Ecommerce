import React, { Component } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Customer } from '../Domain Model/Customers'
import { Authenticate } from '../Security/Auth'
import { Routes } from '../Domain Model/Routes'

const server = axios.create()


export class LoginPage extends Component {

    state = {
        customer: []
    }
    constructor(){

        super();
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    handleEvent = async (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const pass = event.target.password.value
        try {
            console.log(email, pass)
            let res = await server.post('http://localhost:3005/customer/login', {
                customerEmail: email,
            }).then((res) =>{
                console.log(res)
                if(res.data.length > 0){
                     if(Authenticate(res.data[0].customerEmail, pass)){
                        console.log('customer is authenticiation, session formed')
                     }
                    
                }else{
                    console.log('authenticiation failed or customer email not correct')
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    //make the login page route to itemcatalog
    render() {
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleEvent}>
                    <label>Email
                    <input type='text' name='email'/>
                    </label>
                    <label>Password
                    <input type='text' name='password'/>
                    </label>
                    <input type='submit' value='Sign In'/> 
                </form>
                <button onClick={ () => this.nextPath(Routes.register)}>Sign Up</button>
            </div>
        )
    }
}