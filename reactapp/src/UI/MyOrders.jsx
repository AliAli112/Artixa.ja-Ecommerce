import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'
import { Customer } from '../Domain Model/Customers'
import { CustomerController } from '../Application/Controllers/CustomerController'
import {OrdersController } from '../Application/Controllers/OrdersController'
import './styles/orders.css';

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
                let items = []
                let tempItems = eval(data[i]["items"]);
                for(let i=0;i<tempItems.length;i++){
                    let item = new Item(tempItems[i]["id"],tempItems[i]["name"],tempItems[i]["desc"],tempItems[i]["quantity"],tempItems[i]["cost"])
                    items.push(item.getName()+", ")
                }
            let ord = new Order(data[i]["id"],data[i]["cus_id"],items,data[i]["shippingLocation"],data[i]["status"],data[i]["total"]) 
            tOrders.push(ord)    
            }
            this.setState({orders: tOrders})
    })
    }

    render() {

        if(this.state.active === 0){
            return (
                <div id="Main">
                    <span class="order-col-head">
                        <h2 onClick={() => this.setState({active:0})} className="active order-head">Current Orders</h2>
                        <h2 onClick={() => this.setState({active:1})} className="order-head">Past Orders</h2>
                    </span>
                    <div className="col-orders">
                        {this.state.orders.filter(order => order.getStatus() === 0).map(order =>
                            <div onClick={()=> this.handleEvent(order)} onMouseEnter={()=>this.dropDown(order.getId())} id={order.getId()} className="col-order">
                                <div className="order-row">
                                    <h3>{order.getItems()}</h3>
                                    <h3>{order.getLocation()}</h3>
                                </div>
                                <div id={"drop-" + order.getId().toString()} className="order-drop hidden">
                                    {/* <h3>{order.getCustomerID()}</h3> */}
                                    <h3>{order.getItems()}</h3>
                                    <h3>{"$" + order.getTotal().toString()}</h3>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )
        } else{
            return (
                <div id="Main">
                    <span class="order-col-head">
                        <h2 onClick={() => this.setState({active:0})} className="order-head">Current Orders</h2>
                        <h2 onClick={() => this.setState({active:1})} className="active order-head">Past Orders</h2>
                    </span>
                    <div className="col-orders">
                        {this.state.orders.filter(order => order.getStatus() === 1).map(order =>
                            <div onClick={()=> this.handleEvent(order)} onMouseEnter={()=>this.dropDown(order.getId())}  id={order.getId()} className="col-order">
                                <div className="order-row">
                                    <h3>{order.getItems()}</h3>
                                    <h3>{order.getLocation()}</h3>
                                </div>
                                <div id={"drop-" + order.getId().toString()} className="order-drop hidden">
                                    {/* <h3>{order.getCustomerID()}</h3> */}
                                    <h3>{order.getItems()}</h3>
                                    <h3>{"$" + order.getTotal().toString()}</h3>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )
        }

    
    }

    dropDown = (id) => {
        let dropId = ("drop-" + id.toString())
        let drop = document.getElementById(dropId);
        if (drop.classList.contains("hidden")) {
            drop.classList.remove("hidden");
        } else {
            drop.classList.add("hidden");
        }
    }

}