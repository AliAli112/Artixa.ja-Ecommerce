import React, { Component } from 'react'
import { Order } from '../../Domain Model/Orders'
import axios from 'axios'

const server = axios.create()

export class OrdersController {

    private server;
    constructor(){
        this.server = axios.create();
    }

    public getOrders = async () => {
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
        try{
            let res = await this.server.delete(`http://localhost:3005/orders/${id}`).then(); 
            
        }catch(err){
            console.log(err)
        }
    }

    public updateOrderstatus = async (id: number, newstat: number) => {
        try{
            let res = await this.server.post(`http://localhost:3005/orders/${id}`,{
                status: newstat,
            }).then((res) => {
                console.log(res);
            })
        }catch(e){
            console.log(e)
        }
    }
}