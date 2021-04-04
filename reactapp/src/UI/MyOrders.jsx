import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'
import { Customer } from '../Domain Model/Customers'
import { CustomerController } from '../Application/Controllers/CustomerController'
import {OrdersController } from '../Application/Controllers/OrdersController'
//import { json } from '../json/data';
import axios from 'axios'

const server = axios.create()

export class MyOrders extends Component {

    state = {
        active : 0,
        orders: [],
        id: 0
    }

    constructor() {
        super()
        this.controller = new OrdersController;
        this.cusController = new CustomerController;
        this.state.id = this.cusController.getSessionUser().user.id;
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

            if(this.state.active === 0){
                return (
                    <div id="Main">
                        <span id="order-col-head">
                            <h2 onClick={() => this.setState({active:0})} className="active order-head">Active Orders</h2>
                            <h2 onClick={() => this.setState({active:1})} className="order-head">Past Orders</h2>
                        </span>
                        {this.state.orders.filter(order => order.getCustomerID() === this.state.id).filter(order =>order.getStatus()==0).map(order =>
                            <div id={order.getId()} className="col-orders">
                                <h3>{order.getItems()}</h3>
                                <h3>{order.getLocation()}</h3>
                                <h3>{"$"+order.getTotal()}</h3>
                            </div>
                        )}
                    </div>
                )
            } else{
                return (
                    <div id="Main">
                        <span id="order-col-head">
                            <h2 onClick={() => this.setState({active:0})} className="order-head">Outstanding Order</h2>
                            <h2 onClick={() => this.setState({active:1})} className="active order-head">Finished Orders</h2>
                        </span>
                        {this.state.orders.filter(order => order.getCustomerID() === this.state.id).filter(order=>order.getStatus()==1).map(order =>
                            <div id={order.getId()} className="col-orders">
                                <h3>{order.getItems()}</h3>
                                <h3>{order.getLocation()}</h3>
                                <h3>{"$"+order.getTotal()}</h3>
                            </div>
                        )}
                    </div>
                )
            }
    
    
        }

    


}