import React, { Component } from 'react'
import {getallItems} from '../Application/Controllers/ItemController'
import { Item } from '../Domain Model/Item'
import './styles/ShoppingCart.css';
import { Link } from 'react-router-dom';

export class ShoppingCartPage extends Component {

    constructor(props){
        super(props)
        
        console.log(this.props.shoppingCart)
        this.state = {
            cartItemsCost : [],
            total:0
        }

        for(let i = 0;i < this.props.shoppingCart.length; i++){
            this.state.cartItemsCost.push(this.props.shoppingCart[i][0].getCost() * this.props.shoppingCart[i][1])
        }
        this.total = this.total.bind(this);
        this.itemSum = this.itemSum.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount(){
        this.total();

    }
   
    itemSum(item, quantity, e){
      var regex = /^\d+$/;
      if(quantity == ""){
        e.target.value = e.target.defaultValue;
        return;
      }
      if(!regex.test(quantity)){

        e.target.value = e.target.defaultValue;
        return;
      }
      if(e.target.value < 1){
        e.target.value = e.target.defaultValue;
        return;
      }
      else if(e.target.value > item[0].getQuantity()){
        e.target.value = e.target.defaultValue;
        return;
      }

        let itemSums = this.state.cartItemsCost;
        let index = this.props.shoppingCart.findIndex(function (element){return item[0].getName() == element[0].getName()})
        if(item[1] > quantity){
            this.props.removeFromCart(item[0], item[1] - quantity)
            
        }
        else if(item[1] < quantity){ 
            this.props.addToCart(item[0], quantity - item[1])
        }
        else{
            return
        }
        itemSums[index] = quantity * item[0].getCost();
        this.setState({cartItemsCost: itemSums}, ()=>{this.total()}); 
      


    }
    total(){
        let sum = 0;
        for(let i = 0;i < this.state.cartItemsCost.length; i++){
            sum += this.state.cartItemsCost[i]
        }
        this.setState({total:sum})
        //ReactDOM.render(<><span class="label">Total</span><span class="value">{sum}</span><span className="label">Total</span></>, t.total);
    }


    handleClick(item){
        
        let index = this.props.shoppingCart.findIndex(function (element){return item[0].getName() == element[0].getName()})
        this.props.removeFromCart(item[0], item[1])
        let itemSums = this.state.cartItemsCost;
        itemSums.splice(index,1);
        this.setState({cartItemsCost: itemSums}, ()=>{this.total()});

    }

    render(){
        return(
            <div>
            <div className="wrap cf">
  <div className="heading cf">
    <h1>My Cart</h1>
    <Link to="/">

    <a href="#" className="continue">Continue Shopping</a>
    </Link>

  </div>
  <div className="cart">

    <ul className="cartWrap">

    { this.props.shoppingCart.map((item, index) => 
    

      <li className="items odd">
        
    <div className="infoWrap"> 
        <div className="cartSection">
          <h3>{item[0].getName()}</h3>
        
           <p> <input type="text" onBlur={event => this.itemSum(item, event.target.value, event) } className="qty" maxLength="3" defaultValue={item[1]}/> x ${item[0].getCost().toFixed(2)}</p>
        
          <p className="stockStatus"> In Stock</p>
        </div>  
    
        <div className="prodTotal cartSection">
          <p>${this.state.cartItemsCost[index].toFixed(2)}</p>
        </div>
              <div className="cartSection removeWrap">
           <a href="#" className="remove" onClick={()=> {this.handleClick(item)}}>x</a>
        </div>
      </div>
      </li>
    )}
    </ul>
    
  </div>
  

  
  <div className="subtotal cf">
    <ul>
 
    <li className="totalRow final"><span Name="label">Total</span><span className="value">${(this.state.total).toFixed(2)}</span></li>           
     <li className="totalRow"><a href="#" className="btn continue">Checkout</a></li>
    </ul>
  </div>
</div> 
</div>
     
        )
    }


}




