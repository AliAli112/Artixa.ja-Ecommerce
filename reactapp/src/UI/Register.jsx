import React, { Component } from 'react'
import axios from 'axios'
import { Routes } from '../Domain Model/Routes';
import { Customer } from '../Domain Model/Customers'
import { CustomerController } from '../Application/Controllers/CustomerController'
import './styles/Login.css';
import './styles/buttons.css';
 
const server = axios.create()

export class Registration extends Component {
    
    #controller
    constructor(){
        super()
        this.controller = new CustomerController();
    }
    nextPath(path) {
        this.props.history.push(path);
    }

    handleEvent = (event) => {
        event.preventDefault()
        const fname = event.target.fname.value
        const lname = event.target.lname.value
        const addr = event.target.addr.value
        const pnum = event.target.pnum.value
        const email = event.target.email.value
        const pass = event.target.password.value
        this.controller.registerCustomer(email,pass,pnum,addr,fname,lname)
        alert("You have been registered")
        this.nextPath(Routes.index)
    }

    render(){
        return(
            <div className="main">
                <div className="main-container">
                    <div id='rtitle'>Sign-Up</div>
                    <div className="detail-container">
                        <form onSubmit={this.handleEvent}>
                            <div className="input-fields">
                                <div><label>First Name</label></div>
                                <div><input type='text' name='fname' required/></div>
                            </div>
                            <div className="input-fields">
                                <div><label>Last Name</label></div>
                                <div><input type='text' name='lname' required/></div>
                            </div>
                            <div className="input-fields">
                                <div><label>Address</label></div>
                                <div><input type='text' name='addr' required/></div>
                            </div>
                            <div className="input-fields">    
                                <div><label>Phone Number</label></div>
                                <div><input type='number' name='pnum' required/></div>
                            </div>
                            <div className="input-fields">
                                <div><label>Email</label></div>
                                <div><input type='email' name='email' required/></div>
                            </div>
                            <div className="input-fields">
                                <div><label>Password</label></div>
                                <div><input type='password' name='password' required/></div>
                            </div>
                            <div className="btn-container">
                                <input className="oth-btn" type='submit' value='Sign Up'/>
                                <button className="oth-btn" onClick={() => this.nextPath(Routes.index)} >Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}