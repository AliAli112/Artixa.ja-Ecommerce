import React, { Component } from 'react'
import { Item } from '../Domain Model/Item'
import { ItemsController } from '../Application/Controllers/ItemController'
import axios from 'axios'
import './styles/ItemCatalogue.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { OrdersController } from '../Application/Controllers/OrdersController'
import { Order } from '../Domain Model/Orders';

const server = axios.create()


export class ItemsCatalogPage extends Component {

    #controller
    state = {
        items: []
    }
    constructor(){
        super()
        this.ordersController = new OrdersController();
        this.itemsController = new ItemsController();
        //this.getallItems();
        this.addToCart = this.addToCart.bind(this)

    }

    componentDidMount(){
        this.itemsController.getallItems().then(({data}) => {
          let items = []
          for(let i = 0; i < data.length; i++){
            let item = new Item(data[i].id, data[i].itemName, data[i].itemDescription, data[i].itemQuantity, data[i].itemCost)
            items.push(item)

          }
          this.setState({loaded: true , items: items})})

          if(localStorage.getItem("shoppingCart") === null){
            let shoppingCart = [];
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
          }
       
       
    }

   

    deleteItem = async (id) => {
        try{
            let res = await server.delete(`http://localhost:3005/inventory/${id}`).then();
        }catch(e){
            console.log(e);
        }
    }
    addToCart(item){
      
      let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      
      var items = [];
      for(let i = 0; i < shoppingCart.length; i++){
        let item = new Item(shoppingCart[i].id, shoppingCart[i].name, shoppingCart[i].description, shoppingCart[i].quantity, shoppingCart[i].cost)
        items.push(item)
      }
      let index = -1;
      if(items.length > 0){
        index = items.findIndex(function (element){return item.getId() == element.getId()})
        
      }
      let quantity = item.getQuantity();
      console.log(items);

      if(quantity > 0){
      if(index == -1){
        let addedItem = new Item(item.getId(), item.getName(), item.getDescription(), 1, item.getCost());
        items.push(addedItem);
      }
      else if(items[index].getQuantity()+1 <= quantity){
        console.log(items);
        let addedItem = items[index];
        addedItem.updateQuantity(1);
        items[index] = addedItem;
      }
    }
      
      localStorage.setItem('shoppingCart', JSON.stringify(items));
      
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
<div  key={item.getId()} className=" column is-half">
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
         onClick={()=> {this.addToCart(item)}}
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