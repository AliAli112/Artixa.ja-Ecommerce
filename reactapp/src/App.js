import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link,  useHistory, IndexRoute } from 'react-router-dom';
import { RouteEntries } from './Domain Model/Routes';
import { RegisterPage } from './UI/Register';
import { AccountsPage } from './UI/Accounts'
import { ItemsCatalogPage } from './UI/ItemsCatalogPage'
import { InventoryPage } from './UI/Inventory'
import {ShoppingCartPage} from './UI/ShoppingCart'

class App extends Component {
  constructor(props){
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  state = {
    shoppingCart: []
  }
  
  addToCart(item, quantity){
    let shoppingCart =  this.state.shoppingCart;
    if(quantity > item.getQuantity())return;
    let index = shoppingCart.findIndex(function (element){return item.getName() == element[0].getName()})
   
    if(index == -1){
      shoppingCart.push([item, quantity])

    }
    else {
      if(shoppingCart[index][1] + quantity > item.getQuantity())return;
    shoppingCart[index][1]++
    }
    this.setState({shoppingCart: shoppingCart })

  }
  removeFromCart(item, quantity){
    let shoppingCart =  this.state.shoppingCart;

    let index = shoppingCart.findIndex(function (element){return item.getName() == element[0].getName()})
    
    if(quantity >= shoppingCart[index][1]){
      shoppingCart.splice(index, 1);
    }
    else{
      shoppingCart[index][1]-= quantity;
    }
    this.setState({shoppingCart: shoppingCart});

  }
  
  render () {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
            <Route exact path = {RouteEntries.index} render={() => <ItemsCatalogPage {...this.state} addToCart={this.addToCart} />}>
                {/* <AccountsPage /> */}
              </Route>
              <Route exact path = {RouteEntries.shoppingPage} render={() => <ShoppingCartPage {...this.state} addToCart={this.addToCart} removeFromCart={this.removeFromCart}/>}>
            { console.log(this.state.shoppingCart)}
          </Route>
            </Switch>
          </div>
          
        </Router>
      </div>
    );
  }
  
}

export default App;
