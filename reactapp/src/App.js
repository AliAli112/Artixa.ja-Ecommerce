import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link,  useHistory, IndexRoute } from 'react-router-dom';
import { RouteEntries, Routes } from './Domain Model/Routes';
import { ProtectedRoutes } from './Security/ProtectedRoutes'
import { ProtectedRoutesAdmin } from './Security/ProtectedRoutesAdmin'
import { RegisterPage } from './UI/Register';
import { AccountsPage } from './UI/Accounts'
import { ItemsCatalogPage } from './UI/ItemsCatalogPage'
import { LoginPage } from './UI/LoginPage'
import { DashBoardPage } from './UI/DashBoard'
import { OrderCollartorPage } from './UI/OrderCollartor'


class App extends Component {

  render () {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path = {/*Should change this to register later or item catalog*/Routes.index} component={ItemsCatalogPage}/>
              <Route exact path = {Routes.register} component = {RegisterPage} />
              <ProtectedRoutesAdmin
              exact
              path= {Routes.dashboard}
              component={DashBoardPage}/>
              <ProtectedRoutes
              exact
              path= '/item'
              component={ItemsCatalogPage}/>
            </Switch>
          </div>
          <Route path = {Routes.accounts}>
            {/* <AccountsPage />  */}
          </Route>
            <h1>Home</h1>
        </Router>
      </div>
    );
  }
  
}

export default App;
