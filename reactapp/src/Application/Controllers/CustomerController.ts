import React, { Component } from 'react'
import axios from 'axios'
import { Customer } from '../../Domain Model/Customers'



export class CustomerController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public registerCustomer = async (email: string, pass:string, pnum: string, 
                        addr:string, fname:string, lname:string) => {
        try{
            const customer = new Customer(email,pass,0,pnum,addr,fname,lname)
            let res = await this.server.post('http://localhost:3005/customer/register', {
             //to check if in database first
            customerFirstName: customer.getFirstName(),
            customerLastName: customer.getLastName(),
            customerAddress: customer.getaddress(),
            customerPhoneNumber: customer.getphonenum(),
            customerEmail: customer.getEmail(),
            customerPassword: customer.getPassword()
            }).then((res) =>{
                alert('You are now registered')
                console.log(res)
            })
        }catch(err){
            console.log(err);
        }
    
    }

    public isLoggedin = () => {
            let user = JSON.parse(sessionStorage.getItem('user') || '{}')
            if(user.isloggedIn || user.isloggedIn === 'admin'){
                return true
            }else{
                return false
            }
    }

    public getSessionUser = () => {
        return JSON.parse(sessionStorage.getItem('user') || '{}')
    }

    //New method add the class diagram
    public LogoutSession = () => {
        sessionStorage.removeItem('user')
    }
}