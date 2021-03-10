import React, { Component } from 'react'
import axios from 'axios'
import { Customer } from '../Domain Model/Customers'
import { Authenticate } from '../Security/Auth'

const server = axios.create()

export class LoginPage extends Component {

    state = {
        customer: []
    }
    constructor(){
        super();
    }

    loginCustomer = async (email, password) => {
        try {
            console.log(email, password)
            let res = await server.get('http://localhost:3005/customer/login', {
                cus_id: '',
                customerUserName:'',
                customerFirstName: '',
                customerLastName: '',
                customerAddress: '',
                customerPhoneNumber: '',
                customerEmail: email,
                customerPassword: password
            }).then((res) =>{
                console.log(res.data)
            })
        }catch(e){
            console.log(e)
        }
    }

    handleEvent = async (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const pass = event.target.password.value
        try {
            console.log(email, pass)
            let res = await server.post('http://localhost:3005/customer/login', {
                customerEmail: email,
                customerPassword: pass
            }).then((res) =>{
                console.log(res)
                //The implementation of this should be only in the customercontroller where it takes the email only 
                //then returns the user found to Auth.js which will use the /authenciate api to find matching password
                if(res.data.length > 0){
                    Authenticate(res.data, pass)
                    console.log('customer found')
                }else{
                    console.log('no customer found')
                }
            })
        }catch(e){
            console.log(e)
        }
    }

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
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        )
    }
}