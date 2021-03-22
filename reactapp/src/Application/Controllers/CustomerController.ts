import React, { Component } from 'react'
import axios from 'axios'
import { Customer } from '../../Domain Model/Customers'
import { Order } from '../../Domain Model/Orders'



export class CustomerController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public registerCustomer = async (customer: Customer) => {
        try{
            let res = await this.server.post('http://localhost:3005/customer/register', {
            cus_id: customer.getid(),
             //to check if in database first
            customerFirstName: customer.getFirstName(),
            customerLastName: customer.getLastName(),
            customerAddress: customer.getaddress(),
            customerPhoneNumber: customer.getphonenum(),
            customerOrders: JSON.stringify([]),
            customerEmail: customer.getEmail(),
            customerPassword: customer.getPassword()
            }).then((res) =>{
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

    public updateCustomerOrders = async (id: number, order: Order) => {
        //This function is run after checkout
        //the order should be the current list of orders in the customer's orders after running the 
        //updateOrders() in the Customer.ts on the session customer
        try{
            let res = await this.server.post('http://localhost:3005/customer', {
                cus_id: id,
                customerOrders: JSON.stringify(order)
            })
        }catch(err){
            console.log(err)
        }
    }
}