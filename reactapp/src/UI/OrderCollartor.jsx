import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'
import {OrdersController } from '../Application/Controllers/OrdersController'
import {  NavbarAdmin } from './NavBar/Navbar'
import './styles/orders.css';

//import { json } from '../json/data';
import axios from 'axios'

const server = axios.create()

export class OrderCollartor extends Component {

    state = {
        active : 0,
        orders: [],
        customer: []
    }

    constructor() {
        super()
        this.controller = new OrdersController();
    }

    componentDidMount(){
        this.controller.getOrders().then(({data})=> 
        {
            
            let tOrders = [];
            for(let i=0;i<data.length;i++){
                let items = []
                let tempItems = eval(data[i]["items"]);
                console.log(tempItems)
                for(let i=0;i<tempItems.length;i++){
                    let item = new Item(tempItems[i]["id"],tempItems[i]["name"],tempItems[i]["desc"],tempItems[i]["quantity"],tempItems[i]["cost"])
                    items.push(item.getName()+" (x"+ item.getQuantity()+") ")
                }
            let ord = new Order(data[i]["id"],data[i]["cus_id"],items,data[i]["shippingLocation"],data[i]["status"],data[i]["total"]) 
            tOrders.push(ord)    
            }
            this.setState({orders: tOrders})
    })
    }

    handleEvent = (order) => {
        let or = document.getElementById(order.getId());
        this.controller.updateOrderstatus(order, 1);
        // or.classList.add("removed-item");

        window.location.reload();
        
    }


    render() {
        if(this.state.active === 0){
            return (
                <div>
                <NavbarAdmin/>
                <div id="Main">
                    {/* <NavbarAdmin/> */}
                    <span className="order-col-head">
                        <h2 onClick={() => this.setState({active:0})} className="active order-head">Outstanding Order</h2>
                        <h2 onClick={() => this.setState({active:1})} className="order-head">Finished Orders</h2>
                    </span>
                    <div className="col-orders">
                        {this.state.orders.filter(order => order.getStatus() === 0).map(order =>
                            <div onClick={()=> this.handleEvent(order)} onMouseEnter={()=>this.dropDown(order.getId())} onMouseOut={()=>this.dropDown(order.getId())} id={order.getId()} className="col-order">
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
                </div>
            )
        } else{
            return (
                <div><NavbarAdmin/>
                <div id="Main">
                    
                    <span className="order-col-head">
                        <h2 onClick={() => this.setState({active:0})} className="order-head">Outstanding Order</h2>
                        <h2 onClick={() => this.setState({active:1})} className="active order-head">Finished Orders</h2>
                    </span>
                    <div className="col-orders">
                        {this.state.orders.filter(order => order.getStatus() === 1).map(order =>
                            <div onMouseEnter={()=>this.dropDown(order.getId())} onMouseOut={()=>this.dropDown(order.getId())} id={order.getId()} className="col-order">
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