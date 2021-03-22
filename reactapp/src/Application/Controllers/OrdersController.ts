import React, { Component } from 'react'
import { Order } from '../../Domain Model/Orders'
import axios from 'axios'
import { orderrouter } from '../../persistence/ServerAPI/dist/ServerAPI/routes/Orderroutes';

const server = axios.create()

export class OrdersController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public getOrders = async () => {
        //order collator
        try{
            console.log("Controller get all orders")
            let data = await this.server.get("http://localhost:3005/orders");
            console.log(data)
            if(data.status === 200){
                return data
            }
        }catch(e){
            console.log(e)
        }
    }

    public addOrders = async (order: Order) => {
        //checkout
        try{
            console.log("Controller add an orders")
            let res = await this.server.post("http://localhost:3005/orders", {
                cus_id: order.getCustomerID(),
                items: JSON.stringify(order.getItems()),
                shippingLocation: order.getLocation(),
                status: order.getStatus(),
                total: order.getTotal()
            }).then((res) => {
                console.log(res)
            })
        }catch(e){
            console.log(e)
        }
    }

    public deleteOrder = async (id: number) => {
        //ordercollator
        try{
            let res = await this.server.delete(`http://localhost:3005/orders/${id}`).then(); 
            
        }catch(err){
            console.log(err)
        }
    }
    public updateOrderstatus = async (order: Order, newstat: number) => {
        try{
            let res = await server.post(`http://localhost:3005/orders/${order.getId()}`,{
                cus_id: '',
                items: order.getItems(),
                shippingLocation: order.getLocation(),
                status: newstat
            }).then((res) => {
                console.log(res);
            })
        }catch(e){
            console.log(e)
        }
    }
}