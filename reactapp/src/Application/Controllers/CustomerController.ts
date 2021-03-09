import React, { Component } from 'react'
import axios from 'axios'
import { Customer } from '../../Domain Model/Customers'



export class CustomerController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public async registerCustomer(customer: Customer){
        try{
            let res = await this.server.post('http://localhost:3005/customer/register', {
            cus_id: customer.getid(),
            customerUserName: customer.getFirstName(), //to be removed and to add orders instead
            customerFirstName: customer.getFirstName(),
            customerLastName: customer.getLastName(),
            customerAddress: customer.getaddress(),
            customerPhoneNumber: customer.getphonenum,
            customerEmail: customer.getEmail,
            customerPassword: customer.getPassword()
            }).then((res) =>{
                console.log(res)
            })
        }catch(err){
            console.log(err);
        }
        
    }
}