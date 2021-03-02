import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Title } from 'react-bootstrap'
import { RouteEntries } from '../Domain Model/Routes';
import { useHistory } from 'react-router-dom'

export class RegisterPage extends Component {
    
    render(){
        return(
            <div>
                <h1>This is the RegisterPage</h1>
                <Link to='/accounts'>
                    <Button>
                        aco
                    </Button>
                </Link>
                {/* </div>Button to='/accounts' renderAs={RouteEntries.accounts}>Accounts</Button> */}
                {/* <Link to="/accounts">
                    <Button renderAs="button">
                        <span>Accounts</span>
                    </Button>
                </Link> */}
                
            </div>
        )
    }
}