import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'

//import { json } from '../json/data';
import axios from 'axios'

const server = axios.create()

export class OrderCollartorPage extends Component{
    list = [{name: 'meme', age: 40}, {name: 'me', age: 4}]
    state = {
        orders: [],
        

    }
    constructor(){
        super()
        this.getOrders()
    }

    addOrders = async () => {
        let res = await server.post('http://localhost:3005/orders', {
        items: JSON.stringify(this.list),
        shippingLocation: 'space',
        }).then((res) =>{
            console.log(res)
            this.getExpenses();
        })
    }
    
    getOrders = async () => {
        try{
            let data = await server.get('http://localhost:3005/orders')
        .then(({data}) => data)
        var orders = [];
        console.log(data)
        

        // for(let i = 0; i < data.lenght; i++){
        //     let order = new
        // }
        console.log(JSON.parse(data[0].items))
        }catch(err){
            console.log(err)
        }
        
    }

    render() {
        return(
            <div>
                <h2>OrderCollatorPage</h2>
                 <button onClick={this.addOrders}>Add</button>
            </div>
        )
    }
}