import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import axios from 'axios'

const server = axios.create()

export class ItemsCatalogPage extends Component {

    state = {
        items: []
    }
    constructor(){
        super()
        this.getallItems();
    }
    getallItems = async () =>{
        try{
            console.log("run")
            let data = await server.get('http://localhost:3005/inventory').then(({data}) =>
            data);
            console.log(data)
            this.setState({items: data})
            var i;
            var items;
            // for( i=0 ; i<data.lenght ; i++){
            //     console.log(data[i].id)
            //     //items += new Item(data[i].id)
            // }

        }catch(e){
            console.log(e)
        }
    }

    deleteItem = async (id) => {
        try{
            let res = await server.delete(`http://localhost:3005/inventory/${id}`).then();
        }catch(e){
            console.log(e);
        }
    }

    render(){

        return(
            <div>
                ITEMS
                {this.state.items.map(items => <p key={items.id}>{items.itemName}
                <button onClick={() => {this.deleteItem(items.id)}}>Deleteitem 1</button></p>)}
            </div>
        )
    }


}