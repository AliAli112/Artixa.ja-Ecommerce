import React, { Component } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Customer } from '../Domain Model/Customers'
import { Authenticate } from '../Security/Auth'
import { Routes } from '../Domain Model/Routes'
import { CustomerController } from '../Application/Controllers/CustomerController'
import './styles/Login.css';
import './styles/buttons.css';

const server = axios.create()


export class LoginPage extends Component {

    #controller
    state = {
        customer: []
    }
    constructor(){
        super();
        this.controller = new CustomerController();
        this.controller.LogoutSession()
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
                    alert('Authenticiation failed, No such customer found')
                }
                if (this.controller.getSessionUser().isloggedIn === true){
                             this.props.history.push(Routes.itemcatalog)
                            //this.nextPath('/item')
                         }
                         else if (this.controller.getSessionUser().isloggedIn === 'admin'){
                            this.props.history.push(Routes.inventory)
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
            <div className="main">
                <div className="main-container">
                    <div id='title'>Sign-In</div>
                    <form onSubmit={this.handleEvent}>
                        <div className="details-container">
                            <div className="input-fields">
                                <div><label>Email</label></div>
                                <div><input type='email' name='email' required/></div>
                            </div>
                            <div className="input-fields">
                                <div><label>Password</label></div>
                                <div><input type='password' name='password'required/></div>
                            </div>
                            <div className="btn-container">
                                <input className="oth-btn"  type='submit' value='Sign In'/> 
                                <button className="oth-btn" onClick={ () => this.nextPath(Routes.register)}>Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}