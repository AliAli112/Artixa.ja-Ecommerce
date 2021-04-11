import { ItemsController } from '../Application/Controllers/ItemController'
import { Item } from '../Domain Model/Item'
import React, { Component } from 'react'
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import {ProductDetails} from '../UI/ProductDetails';
import {  NavbarAdmin } from './NavBar/Navbar'
import Popup from 'reactjs-popup';

export class InventoryPage extends Component {
    state = {
        items: []
     
    }
    ref = null;

    constructor(){
        super()
       
        this.itemsController = new ItemsController();
        this.getItems = this.getItems.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
        this.updateItem = this.updateItem.bind(this);
        


    }
    componentDidMount(){
        this.getItems();
        
       
    }
    
    
    async updateItem(cell){
        let quantity = cell._cell.value;
        if(quantity == "" || quantity == "e"){
            cell._cell.value = cell._cell.oldValue;
            return true;
        }
        console.log(quantity);

        let id = cell.getRow().getCell("id")._cell.value;
        this.itemsController.updateItemAmount(id, quantity);
        await this.getItems();
        return true;
    }
    async getItems(){
        this.itemsController.getallItems().then(({data}) => {
            let items = []
            for(let i = 0; i < data.length; i++){
              let item = new Item(data[i].id, data[i].itemName, data[i].itemDescription, data[i].itemQuantity, data[i].itemCost)
              items.push(item)
  
            }
            this.setState({loaded: true , items: items})})

    }
    async deleteItems(){
        let selected = this.ref.table.getSelectedRows();
        for (var i = 0; i < selected.length; i++) {
            console.log(selected[i].getIndex());
            this.itemsController.deleteItem(selected[i].getIndex());
    }
    await this.getItems();
    
    this.ref.table.replaceData(this.state.items);
    console.log(this.state.items);
}
    render(){
        return(
            
            <div>
                <NavbarAdmin/>
                <div>


                <Popup trigger={<button id="add" >Add</button>}  modal position="center center">
                <ProductDetails itemController = {this.itemsController} />

  </Popup>
<button id="delete" onClick={()=>{this.deleteItems()}}>Delete</button>


</div>

                    <ReactTabulator columns={ [{formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center",width:"5%", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
        }},        

        {title:"Id", field:"id" },

{title:"Name", field:"name", validator:["required","unique"]},
                    {title:"Description", field:"description", validator:["required","unique"]},
	    {title:"Cost", field:"cost", hozAlign:"right", validator:"min:0", formatter:"money",formatterParams:{symbol:"$"}},
	    {title:"Quantity", field:"quantity", editor:"number", validator:"min:0"}]} data={this.state.items}   ref={ref => (this.ref = ref)} cellEdited={this.updateItem} options={ {height: "100%",
        layout:"fitColumns",
        addRowPos:"top",
        pagination:"local",
        selectable:true}   
        } />

                
            </div>)}

}
