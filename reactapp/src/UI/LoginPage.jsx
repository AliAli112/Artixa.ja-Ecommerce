import React, { Component } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Customer } from '../Domain Model/Customers'
import { Authenticate } from '../Security/Auth'
import { Routes } from '../Domain Model/Routes'
import { CustomerController } from '../Application/Controllers/CustomerController'

const server = axios.create()


export class LoginPage extends Component {

    #controller
    state = {
        customer: []
    }
    constructor(){
        super();
        this.controller = new CustomerController();
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
                if (this.controller.getSessionUser().isloggedIn === true){
                             this.props.history.push('/item')
                            //this.nextPath('/item')
                         }
                         else if (this.controller.getSessionUser().isloggedIn === 'admin'){
                            this.props.history.push(Routes.dashboard)
                            //this.nextPath(Routes.dashboard)
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
                    <input type='text' name='email' required/>
                    </label>
                    <label>Password
                    <input type='text' name='password'required/>
                    </label>
                    <input  type='submit' value='Sign In'/> 
                </form>
                <button onClick={ () => this.nextPath(Routes.register)}>Sign Up</button>
            </div>
        )
    }
}