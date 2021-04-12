import React, { Component } from 'react'
import { ItemsController } from '../Application/Controllers/ItemController';
import { Item } from '../Domain Model/Item'
import { NavbarAdmin } from './NavBar/Navbar'
import './styles/reports.css';


export class Reports extends Component{

    state = {
        items: [],
        initial: 0,
        final: 0,
        current: 0,
    }


    constructor(){
        super();
        this.controller = new ItemsController();

    }

    componentDidMount() {
        this.controller.getallItems().then(({data}) => {
            let tItems = [];
           
            for(let i=0;i<data.length;i++){
                let itemsarr = new Item(data[i]['itemID'], data[i]['itemName'], data[i]['itemDescr'], data[i]['itemQuantity'], data[i]['itemCost'])
                let dict = {} 
                dict['Name'] = itemsarr.getName();
                dict['Quantity'] = itemsarr.getQuantity();

                tItems.push(dict);
            }
            this.setState({items: tItems})    
        })
    }
    


    handleEvent = () => {
        let inputs = Array.from(document.getElementsByClassName('input'));
        let best = document.getElementById('best-item')
        let btn = document.getElementById('btn')
        let diffarr = []
        for(let i=0;i<inputs.length;i++){
            let name = inputs[i].querySelector('label').textContent;
            let inp = inputs[i].querySelector('input').value;
            let diff = inp - this.state.items[i]['Quantity']
            let dict = {}
            dict["Name"] = name
            dict["Quantity"] = diff
            diffarr.push(dict)
            inputs[i].innerHTML=''
            let div = document.createElement('div')
            div.classList.add("outputvals")
            let title = document.createElement('h5')
            let amount = document.createElement('label')
            title.innerHTML = this.state.items[i]['Name']
            amount.innerHTML =  diff
            div.appendChild(title)
            div.appendChild(amount)
            inputs[i].appendChild(div)
        }
        diffarr.sort(function(a, b) {
            return a.Quantity - b.Quantity
          });
        console.log(diffarr)
        best.innerHTML = "Best Selling Item: " + diffarr[diffarr.length-1]['Name'].toString()
        btn.classList.add('hidden')
    }

    
    
    render(){
        return(
            <div>
                <NavbarAdmin/>
            <div class = "container">
                <h1>Stock Report</h1>
              
                <table class ="table">
                    <tbody>
                        <tr>
                            <th> Items </th>
                            <th id = 'units'> Units Sold </th>
                        </tr>
                        <div>
                        {this.state.items.map(item =>
                            <form className = 'input'>
                                
                                <tr>
                                    <td><label>{item['Name']}</label></td>
                                    <td id= 'input-field'><input type='number' name='initial' id = 'input-field' placeholder='Initial Amount'/></td>
                                </tr>
                                
                            </form>
                            )}
                        </div>
                    </tbody>
                </table> 
                
            <button id='btn' className='but' onClick={this.handleEvent}>Generate Reports</button>


            
            <div class = 'best'>
                <h3 id= "best-item">Best Selling Item:</h3>
            </div>

            </div>
        </div>
        
    
    )

    }



}