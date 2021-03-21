import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { ItemsController } from '../Application/Controllers/ItemController'
import axios from 'axios'

const server = axios.create()

export class ItemsCatalogPage extends Component {

    #controller
    state = {
        items: []
    }
    constructor(){
        super()
        this.controller = new ItemsController();
        console.log(this.controller.getallItems())
        //this.getallItems();

    }

    componentDidMount(){
        this.controller.getallItems().then(({data}) => 
        this.setState({loaded: true , items: data}))
    }

    //Need to add these controller functions to Application/Controllers then export them
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

    updateItem = async (id, amount) => {
        //Create a null item object, run update item in it then getQuantity and update database
        //Or run getItem {by id} then run the updateAmount() method on it then getQuantity
        const updateItem = new Item('', '','',amount, '');
        try{
            console.log(updateItem.getQuantity())
            let res = await server.post(`http://localhost:3005/inventory/${id}`, {
                itemName: '',
                itemQuantity: updateItem.getQuantity(),
            }).then();
        }catch(err){
            console.log(err);
        }
    }

    render(){

        return( 
            <div>
                ITEMS
                {this.state.items.map(items => <p key={items.id}>{items.itemName}
                <button onClick={() => {this.deleteItem(items.id)}}>Deleteitem 1</button>
                <input type='number' id='update' />
                <button onClick={() => 
                    {this.updateItem(items.id, 55)} }>Update</button></p>)}
            </div>
        )
    }


}