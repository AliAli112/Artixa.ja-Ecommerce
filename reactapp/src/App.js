import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, IndexRoute } from 'react-router-dom';
import { Routes } from './Domain Model/Routes';
import { ProtectedRoutes } from './Security/ProtectedRoutes'
import { ProtectedRoutesAdmin } from './Security/ProtectedRoutesAdmin'
import { Registration } from './UI/Register';
import { Accounts } from './UI/Accounts'
import { ItemsCatalog } from './UI/ItemsCatalogPage'
import { Login } from './UI/LoginPage'
import { OrderCollartor } from './UI/OrderCollartor'
import { ShoppingCart } from './UI/ShoppingCart'
import { Inventory } from './UI/Inventory'
import { MyOrders } from './UI/MyOrders'
import { Reports } from './UI/Reports'
 



class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path = {/*Should change this to register later or item catalog*/Routes.index} component={Login}/>
              <Route exact path = {Routes.register} component = {Registration} />
              <ProtectedRoutes
              exact
              path= {Routes.itemcatalog}
              component={ItemsCatalog}/>
              <ProtectedRoutes
              exact
              path= {Routes.shoppingCart}
              component={ShoppingCart}/>
              <ProtectedRoutes
              exact
              path={Routes.myorders}
              component={MyOrders}/>
              <ProtectedRoutesAdmin
              exact
              path={Routes.orders}
              component={OrderCollartor}/>
              <ProtectedRoutesAdmin
              exact
              path= {Routes.inventory}
              component={Inventory}/>
              <ProtectedRoutesAdmin
              exact
              path={Routes.accounts}
              component={Accounts}/>
              <ProtectedRoutesAdmin
              exact
              path={Routes.reports}
              component={Reports}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
