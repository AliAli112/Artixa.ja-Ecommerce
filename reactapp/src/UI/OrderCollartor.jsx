import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { Order } from '../Domain Model/Orders'
//import { json } from '../json/data';
import axios from 'axios'

const server = axios.create()

export class OrderCollartorPage extends Component {

    state = {
        list: [
            { id: 0, name: 'Teriq Strachan', location: "2 Eltham Vista Drive, Spanish Town, St. Catherine", description: "2 Necklaces, 1 MK Handbag", total: 50.00, status: 0 },
            { id: 1, name: 'Aliyah Mills', location: "2 Eltham View Parkway, Bull Bay, St. Andrew", description: "2 Rasta Bracelets", total: 20.59, status: 0 },
            { id: 2, name: 'Jason Gayle', location: "23 Roberts Ave, Old Harbour, St. Catherine", description: "2 Necklaces, 1 MK Handbag", total: 50.00, status: 0 },
            { id: 3, name: 'Jordon Porter', location: "2 Greendale Lane, Spanish Town, St. Catherine", description: "2 Necklaces, 1 MK Handbag", total: 50.00, status: 0 }
        ]
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
                    <h2 onClick={() => this.showCurrent()} className="active order-head">Outstanding Order</h2>
                    <h2 onClick={() => this.showFinished()} className="order-head">Finished Orders</h2>
                </span>
                {this.state.list.filter(item => item["status"] === 0).map(item =>
                    <div id={item["id"]} className="col-orders">
                        <input onClick={() => this.changeStatus(item)} type="checkbox" />
                        <h3>{item["name"]}</h3>
                        <h3>{item['location']}</h3>
                        <img onClick={() => this.dropDown(item["id"])} className="drop-arrow" src="https://www.pinclipart.com/picdir/big/130-1304123_drop-down-arrow-svg-png-icon-free-download.png" alt="Drop Down"></img>
                        <div id={"drop-" + item["id"].toString()} className="order-drop hidden">
                            <h3>{item["name"]}</h3>
                            <h3>{item['description']}</h3>
                            <h3>{"$" + item['total'].toString()}</h3>
                        </div>
                    </div>
                )}
            </div>
        )

    }

    showCurrent = () => {
        let bod = document.getElementById("order-bod");
        bod.innerHTML =
            this.state.list.filter(item => item["status"] === 0).map(item =>
                <div id={item["id"]} className="col-orders">
                    <input onClick={() => this.changeStatus(item)} type="checkbox" />
                    <h3>{item["name"]}</h3>
                    <h3>{item['location']}</h3>
                    <img onClick={() => this.dropDown(item["id"])} className="drop-arrow" src="https://www.pinclipart.com/picdir/big/130-1304123_drop-down-arrow-svg-png-icon-free-download.png" alt="Drop Down"></img>
                    <div id={"drop-" + item["id"].toString()} className="order-drop hidden">
                        <h3>{item["name"]}</h3>
                        <h3>{item['description']}</h3>
                        <h3>{"$" + item['total'].toString()}</h3>
                    </div>
                </div>
            )
    }



    showFinished = () => {
        this.state.list.filter(item => item["status"] === 1).map((item =>
            <div id={item["id"]} className="col-orders">
                <input onClick={() => this.changeStatus(item)} type="checkbox" />
                <h3>{item["name"]}</h3>
                <h3>{item['location']}</h3>
                <img onClick={() => this.dropDown(item["id"])} className="drop-arrow" src="https://www.pinclipart.com/picdir/big/130-1304123_drop-down-arrow-svg-png-icon-free-download.png" alt="Drop Down"></img>
                <div id={"drop-" + item["id"].toString()} className="order-drop hidden">
                    <h3>{item["name"]}</h3>
                    <h3>{item['description']}</h3>
                    <h3>{"$" + item['total'].toString()}</h3>
                </div>
            </div>
        ))
    }

    dropDown = (id) => {
        let dropId = ("drop-" + id.toString())
        let drop = document.getElementById(dropId);
        console.log(drop);
        if (drop.classList.contains("hidden")) {
            drop.classList.remove("hidden");
        } else {
            drop.classList.add("hidden");
        }
        console.log(this.getOrders())
    }

    changeStatus = (item) => {
        item["state"] = 1;
        const newList = this.state.list.splice(this.state.list.indexOf((item), 1));
        this.setState(newList);
    }
}