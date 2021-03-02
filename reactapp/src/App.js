import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link,  useHistory, IndexRoute } from 'react-router-dom';
import { RouteEntries } from './misc/Routes';
import { RegisterPage } from './UI/Register';
import { AccountsPage } from './UI/Accounts'
import { ItemsCatalogPage } from './UI/ItemsCatalogPage'


class App extends Component {

  render () {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path = {/*Should change this to register later or item catalog*/RouteEntries.index} component={AccountsPage}>
                {/* <AccountsPage /> */}
              </Route>
            </Switch>
          </div>
          <Route path = {RouteEntries.accounts}>
            {/* <AccountsPage />  */}
          </Route>
            <h1>Home</h1>
        </Router>
      </div>
    );
  }
  
}

export default App;