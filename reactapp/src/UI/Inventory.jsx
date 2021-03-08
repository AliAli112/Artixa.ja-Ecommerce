import React, { Component } from 'react'
import {getallItems} from '../Application/Controllers/ItemController'
import { Item } from '../Domain Model/Item'

export class InventoryPage extends Component {
    state = {
        items: []
    }
    constructor(){
        super()
        //getallItems();
       this.l()
        //console.log(getallItems())
       // 

    }

    l = async() => {
        let r = await getallItems()
        
        this.setState({items: r})
    }
    render(){
        return(
            <div>
            
        {this.state.items.map(items => <p key={items.id}>{items.itemName}{items.itemQuantity}{items.itemCost}</p>)}
        </div>
        )
    }


}
