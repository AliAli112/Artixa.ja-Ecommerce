import React, { Component } from 'react'
import axios from 'axios'
import { Routes } from '../Domain Model/Routes'

const server = axios.create()


export class DashBoardPage extends Component {

    state = {
        customer: []
    }
    constructor(){

        super();
    }
    render(){
        return(
            <div>
                <h2>Dashboard</h2>
            </div>
        )
    }
}