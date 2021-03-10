import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { User } from '../Domain Model/User'
import { Customer } from '../Domain Model/Customers';
import { Admin } from '../Domain Model/Admin'


export function Authenticate(user, password){ //takes in a customer
    //const [loginStatus, setLoginStatus] = useState("")
    if(user.getEmail() === 'admin@gmail.com'){
        if(user.getPassword() === password){
            //
        }
    }
    //     //store session as an admin so make admin object
    // }else{
    //     //store as a customer
    // }
    const sessionuser = JSON.stringify({isloggedIn: true, user: user})
    sessionStorage.setItem('user', sessionuser)
    console.log(sessionStorage.getItem('user'))
}