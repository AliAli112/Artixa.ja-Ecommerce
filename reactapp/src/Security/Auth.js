import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { User } from '../Domain Model/User'
import { Customer } from '../Domain Model/Customers';
import { Admin } from '../Domain Model/Admin'

const server = axios.create()

export function Authenticate(email, password){ //takes in a customer
    let user = new Customer('','',null,'','','','',[])
    let res = server.get('http://localhost:3005/customer/authenticate', {
        customerEmail: email,
        customerPassword: password
    }).then((res) => {
        if(res.data.length > 0 ){
            let data = new Customer(res.data[0].customerEmail, res.data[0].customerPassword, 
                res.data[0].cus_id, res.data[0].customerPhoneNumber, res.data[0].customerAddress, 
                res.data[0].customerFirstName, res.data[0].customerLastName, JSON.parse(res.data[0].customerOrders) )
                user = data
            }else{
            console.log("user password not correct")
            //they arent authenticated
            const sessionuser = JSON.stringify({isloggedIn: false , user: user})
            sessionStorage.setItem('user', sessionuser)
            console.log(sessionStorage.getItem('user'))
            return false
        }
    });
    if(user.getEmail() === 'admin@gmail.com'){
        console.log(user)
        const admin = new Admin(user.getEmail(), user.getPassword(), 9999)
        const sessionuser = JSON.stringify({isloggedIn: 'admin', user: admin})
        sessionStorage.setItem('user', sessionuser)
        console.log(sessionStorage.getItem('user'))
        return true
    }else{
        console.log(user)
        const sessionuser = JSON.stringify({isloggedIn: true, user: user})
        sessionStorage.setItem('user', sessionuser)
        console.log(sessionStorage.getItem('user'))
        return true
    }
    //     //store session as an admin so make admin object
    // }else{
    //     //store as a customer
    // }
}