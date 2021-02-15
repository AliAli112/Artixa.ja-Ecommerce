import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'
import { RouteEntries } from './misc/Routes';
import { RegisterPage } from './pages/Register';
import { AccountsPage } from './pages/Accounts'



class App extends Component {

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path = {/*Should change this to register later*/RouteEntries.index}>
            <AccountsPage />
          </Route>
          <Route path = {RouteEntries.accounts}>
            {/* <AccountsPage />  */}
          </Route>
            <h1>Home</h1>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
