import React, { Component } from 'react';
import {Item} from '../Domain Model/Item'



export class ProductDetails extends Component {

    constructor(props){
        super(props)
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }
    state = {
        name: "",
        description: "",
        cost: "",
        quantity: "",
        focused: "",
        formData: null
      };
      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        if(nam == "cost")val = Number(val).toFixed(2);
        this.setState({[nam]: val});
        console.log(this.state);
      }
      mySubmitHandler = (event) => {
        event.preventDefault();
        let name = this.state.name;
        let description = this.state.description;
        let quantity = this.state.quantity;
        let cost = this.state.cost;

        if(name == "")return alert("Enter item name");
        if(description == "")return alert("Enter item description");
        if(quantity == "")return alert("Enter quantity");
        if(cost == "")return alert("Enter cost");

        if (!Number(quantity)) {
          return alert("Quantity must be a number");
        }
        if(!Number.isInteger(parseInt(quantity))){
            return alert("Quantity must be an integer");
        }
        if(quantity < 0){
            return alert("Quantity must be greater than 0");
        }
        let item = new Item(null, name, description, quantity, cost);
        this.props.itemController.addItem(item);
        alert("Product has been added");

      }

      render() {return(
        <form>
        <p>Enter name of product:</p>
        <input
          type='text'
          name='name'
          onChange={this.myChangeHandler}
        />
        <p>Enter product description:</p>
        <input
          type='text'
          name='description'
          onChange={this.myChangeHandler}
        />
         <p>Enter the cost of the product:</p>
         <input
          type='number'
          name='cost'
          onChange={this.myChangeHandler}
        />
        <p>Enter the quantity of the product:</p>
                <input
          type='number'
          name='quantity'
          onChange={this.myChangeHandler}
        />
        <button onClick={(event)=>{this.mySubmitHandler(event)}}>Add Product</button>

        </form>
      )}

}
