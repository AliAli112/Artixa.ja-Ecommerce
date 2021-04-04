import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'
import {OrdersController } from '../Application/Controllers/OrdersController'
//import { json } from '../json/data';
import axios from 'axios'

const server = axios.create()

export class MyOrders extends Component {

    state = {
        active : 0,
        orders: [],
        id: 1
    }

    constructor() {
        super()
        this.controller = new OrdersController;
    }

    componentDidMount(){
        this.controller.getmyOrders(this.state.id).then(({data})=> 
        {
            
            let tOrders = [];
            for(let i=0;i<data.length;i++){
            let ord = new Order(data[i]["id"],data[i]["cus_id"],data[i]["items"],data[i]["shippingLocation"],data[i]["status"],data[i]["total"]) 
            tOrders.push(ord)    
            }
            this.setState({orders: tOrders})
    })
    }



    render() {
        return (
            <div id="Main">
                {this.state.orders.filter(order => order.getStatus() === 0).map(order =>
                    <div id={order.getId()} className="col-orders">
                        <h3>{order.getItems()}</h3>
                        <h3>{"$" + order.getTotal().toString()}</h3>
                    </div>
                )}
            </div>
        )
        


    }


}