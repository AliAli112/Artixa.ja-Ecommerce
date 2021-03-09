import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Title } from 'react-bootstrap'
import { RouteEntries } from '../Domain Model/Routes';
import { CustomerController } from '../Application/Controllers/CustomerController'
 
const server = axios.create()

export class RegisterPage extends Component {
    
    #controller
    constructor(){
        super()
        this.#controller = new CustomerController();
    }

    handleEvent = (event) => {

    }

    render(){
        return(
            <div>
                <h1>This is the RegisterPage</h1>
                <div>
                    <form onSubmit={this.handleEvent}>
                        <label>First Name
                        <input type='text' name='fname'/>
                        </label>
                        <label>Last Name
                        <input type='text' name='lname'/>
                        </label>
                        <label>Address
                        <input type='text' name='addr'/>
                        </label>
                        <label>Phone Number
                        <input type='text' name='pnum'/>
                        </label>
                        <label>Email
                        <input type='text' name='email'/>
                        </label>
                        <label>Password
                        <input type='text' name='password'/>
                        </label>
                        <input type='submit' value='Sign Up'/>
                    </form>
                </div>
            </div>
        )
    }
}