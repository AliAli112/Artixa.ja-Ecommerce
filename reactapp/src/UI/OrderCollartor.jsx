import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'
//import { json } from '../json/data';
import axios from 'axios'

const server = axios.create()

export class OrderCollartorPage extends Component {

    state = {
        list: [{ name: 'meme', age: 40 }, { name: 'me', age: 4 }],
        orders: []


    }
    constructor() {
        super()
        this.getOrders()
    }

    addOrders = async () => {
        let res = await server.post('http://localhost:3005/orders', {
            items: JSON.stringify(this.list),
            shippingLocation: 'space',
        }).then((res) => {
            console.log(res)
            this.getExpenses();
        })
    }

    getOrders = async () => {
        try {
            let data = await server.get('http://localhost:3005/orders')
                .then(({ data }) => data)
            var orders = [];
            console.log(data)


            // for(let i = 0; i < data.lenght; i++){
            //     let order = new
            // }
            console.log(JSON.parse(data[0].items))
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        return (
            <div>
                <span id="order-col-head">
                    <h2 className="active order-head">Outstanding Order</h2>
                    <h2 className="order-head">Finished Orders</h2>
                </span>

                {this.state.list.map(item => (
                    <div className="col-orders">
                        <input type="checkbox" />
                        <h3>{item["name"]}</h3>
                        <h3>Location</h3>
                        <img src="https://www.pinclipart.com/picdir/big/130-1304123_drop-down-arrow-svg-png-icon-free-download.png" alt="Drop Down"></img>
                    </div>
                ))}
                <button onClick={this.addOrders}>Add</button>
            </div>
        )
    }
}