import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import axios from 'axios'
import './styles/ItemCatalogue.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'

const server = axios.create()


export class ItemsCatalogPage extends Component {

    state = {
        items: []
    }
    constructor(props){
        super(props)
        this.getallItems();
        console.log(this.props.shoppingCart)
    }

    //Need to add these controller functions to Application/Controllers then export them
    getallItems = async () =>{
        try{
            console.log("run")
            let data = await server.get('http://localhost:3005/inventory').then(({data}) =>
            data);
            var items = [];

            for(let i = 0; i < data.length; i++){
              let item = new Item(data[i].id, data[i].itemName, data[i].itemDescription, data[i].itemQuantity, data[i].itemCost)
              items.push(item)

            }
            console.log(data.length)
            
            this.setState({items: items})
            var i;
            
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
            <>
                                

            <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Our Products</h4>
        </div>
      </div>
      <br />
      <Link to='/shoppingCart'>Cart</Link>
      <div className="container">
        <div className="column columns is-multiline">
            {this.state.items.map(item => 
<div className=" column is-half">
<div className="box">
  <div className="media">
    <div className="media-left">
      <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="asa"/>
      </figure>
    </div>
    <div className="media-content">
      <b style={{ textTransform: "capitalize" }}>
        {item.getName()}{"  "}
        <span className="tag is-primary">${item.getCost().toFixed(2)}</span>
      </b>
      <div>{item.getDescription()}</div>
      {item.getQuantity() > 0 ? (
              <small>{item.getQuantity() + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}

      <div className="is-clearfix">
        <button
          className="button is-small is-outlined is-primary   is-pulled-right"
         onClick={()=>this.props.addToCart(item, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
</div>
            )}
            </div>
            </div>
            </>
        )
    }


}