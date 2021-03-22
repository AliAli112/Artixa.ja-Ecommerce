import React from 'react';
import { render } from 'react-dom';
import { Route , Redirect } from 'react-router-dom'
import { CustomerController } from '../Application/Controllers/CustomerController'
import { Routes } from '../Domain Model/Routes';

export const ProtectedRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route 
         {...rest}
         render = {props => {
             if(JSON.parse(sessionStorage.getItem('user') || '{}').isloggedIn === true){
                 return <Component { ...props} />
             }else {
                 return (
                     <Redirect
                     to= {{
                         pathname: Routes.index,
                         state: {
                            from: props.location}
                         }}
                    />
                 )
             }
         }}/>
    )
}