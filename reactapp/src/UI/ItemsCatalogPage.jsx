import React, { Component } from 'react'
import { Item } from '../misc/Item'
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
            var i;
            var items;
            for( i=0 ; i<data.lenght ; i++){
                console.log(data[i].id)
                //items += new Item(data[i].id)
            }

        }catch(e){

        }
    }

    deleteItem = async () => {
        try{
            let res = await server.delete('http://localhost:3005/inventory').then();
        }catch(e){
            console.log(e);
        }
    }

    render(){

        return(
            <div>
                ITEMS
                <button onClick={this.deleteItem}>Deleteitem 1</button>
            </div>
        )
    }


}