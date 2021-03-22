import React, { Component } from 'react'
import {ItemsController} from '../Application/Controllers/ItemController'
import { ExpensesController} from '../Application/Controllers/AccountsController'
import { Item } from '../Domain Model/Item'
import { Customer } from '../Domain Model/Customers'
import './styles/ShoppingCart.css';
import { Link } from 'react-router-dom';
import { Order } from '../Domain Model/Orders'
import {OrdersController} from '../Application/Controllers/OrdersController'
import {CustomerController} from '../Application/Controllers/CustomerController'
import Popup from 'reactjs-popup';
import {CreditCardInfo} from './CreditCardInfo';
import { OrderStatus } from '../Domain Model/Enum'

export class ShoppingCart extends Component {

    constructor(props){
        super(props)
       
        let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        var items = [];

      for(let i = 0; i < shoppingCart.length; i++){
        let item = new Item(shoppingCart[i].id, shoppingCart[i].name, shoppingCart[i].description, shoppingCart[i].quantity, shoppingCart[i].cost)
        items.push(item);
      }
      shoppingCart = items;
     // console.log(items);
     
      this.state = {
        inventory: [],
        total:0,
        shoppingCart: items
    }
    this.itemsController = new ItemsController();
    this.expenseController = new ExpensesController();
  //  this.customerController = new custo
   this.itemsController.getallItems().then(({data})=>{
    //  data = data.data;
        
        items = []
        for(let i = 0; i < data.length; i++){
          let item = new Item(data[i].id, data[i].itemName, data[i].itemDescription, data[i].itemQuantity, data[i].itemCost)
          items.push(item)
        }
        this.setState({inventory: items});

    });  
      
        this.total = this.total.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkout = this.checkout.bind(this);
      //  this.checkInventory = this.checkInventory(this);

    }
    componentDidMount(){
        
        this.ordersController = new OrdersController();
        this.customerController = new CustomerController();
        let shoppingCart = this.state.shoppingCart;
//for(let i = 0;i < shoppingCart.length; i++){
          // this.state.cartItemsCost.push(shoppingCart[i].getCost() * shoppingCart[i].getQuantity())
//}
      this.total();
      let user = JSON.parse(sessionStorage.getItem('user'));
      user= user.user;
      console.log(user);

    }
    async checkInventory(){
      
      let data = await this.itemsController.getallItems();
        
      data = data.data;
        let errors = [];
        let update = [];
        let items = []
        for(let i = 0; i < data.length; i++){
          let item = new Item(data[i].id, data[i].itemName, data[i].itemDescription, data[i].itemQuantity, data[i].itemCost)
          items.push(item)

        }
        

      for(let x = 0; x < this.state.shoppingCart.length; x++){
          let id = this.state.shoppingCart[x].getId();
          let index = items.findIndex(function (element){return id == element.getId()})
          if(index == -1){
            alert(this.state.shoppingCart[x].getName() + " is no longer offered");
            return false;
          }
          
          let item = items[index];
          //item = new Item(item.id, item.itemName, item.itemQuantity, item.itemDescription, item.itemCost);
          console.log(item);
          if(item.getQuantity() < this.state.shoppingCart[x].getQuantity()){
            alert("There are only " + item.getQuantity() + " " +item.getName() + " left");

            return false;
          }
          else{
            update.push([item.getId(), item.getQuantity() - this.state.shoppingCart[x].getQuantity()])
           // this.itemsController.updateItemAmount(item.getId(), item.getQuantity() - this.state.shoppingCart[x].getQuantity());
          }
        }
        
        
          for(let x =0; x < update.length; x++){
            this.itemsController.updateItemAmount(update[x][0],update[x][1]);
          }
        return true;
        
        

    }
    async checkout(){
      if(this.state.shoppingCart == [])return;
       let user = JSON.parse(sessionStorage.getItem('user'));
       user= user.user;
       //let customerOrders = JSON.parse(user.orders);
       let customerOrders = null;

       if(customerOrders == null){
        customerOrders = [];
       }
       let customer = new Customer(user.email, user.password, user.id, user.phonenum, user.address, user.firstname, user.lastname,  customerOrders);
     //  let customer = new Customer(user.)
      console.log(user.id);
  
        
     let sucess = await this.checkInventory();
      if(!sucess)return;

      
    //Add orders and claer cart
       let order = new Order(null , customer.id, this.state.shoppingCart, customer.address, OrderStatus.pending , this.state.total.toFixed(2));
       console.log(JSON.stringify(order));
       this.ordersController.addOrders(order);
       this.expenseController.updateRevenue(this.state.total);
       //customer.addOrder(order);
      // this.customerController.updateCustomerOrders(customer.id, order);
       localStorage.setItem('shoppingCart', JSON.stringify([]));
       //sessionStorage.setItem("user", JSON.stringify(customer));
       this.setState({shoppingCart: []})
       this.setState({total: 0});
       console.log(sessionStorage.getItem("user"));
       alert("Your order has been placed");
       
    }
  
   
    async handleQuantity(item, e){

      let indexCart = this.state.shoppingCart.findIndex(function (element){return item.getId() == element.getId()})
      let indexInven = this.state.inventory.findIndex(function (element){return item.getId() == element.getId()})

      var regex = /^\d+$/;
      if(e.target.value == "" || !regex.test(e.target.value) || e.target.value < 1 || e.target.value > this.state.inventory[indexInven].getQuantity()){
        e.target.value = e.target.defaultValue;
        return;
      }

      let shoppingCart = this.state.shoppingCart;
        if(this.state.shoppingCart[indexCart].getQuantity() > e.target.value){
          shoppingCart[indexCart].updateQuantity(e.target.value - shoppingCart[indexCart].getQuantity())
            
        }
        else if(this.state.shoppingCart[indexCart].getQuantity() < e.target.value){ 
          shoppingCart[indexCart].updateQuantity(e.target.value - shoppingCart[indexCart].getQuantity())

        }
        else{
            return
        }
        this.setState({shoppingCart: shoppingCart}, ()=>{localStorage.setItem("shoppingCart", JSON.stringify(this.state.shoppingCart));this.total()}); 


    }
    total(){
        let sum = 0;
        for(let i = 0;i < this.state.shoppingCart.length; i++){
            sum += this.state.shoppingCart[i].getCost() * this.state.shoppingCart[i].getQuantity();
        }
        this.setState({total:sum})
        //ReactDOM.render(<><span class="label">Total</span><span class="value">{sum}</span><span className="label">Total</span></>, t.total);
    }


    handleClick(item){
        
     
        let shoppingCart = this.state.shoppingCart;
        let index = this.state.shoppingCart.findIndex(function (element){return item.getId() == element.getId()})
        shoppingCart.splice(index,1);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

        this.setState({shoppingCart: shoppingCart}, ()=>{this.total()});
        
    }

    render(){
        return(
            <div>
            <div className="wrap cf">
  <div className="heading cf">
    <h1>My Cart</h1>
    <Link to="/item">

    <a href="#" className="continue">Continue Shopping</a>
    </Link>

  </div>
  <div className="cart">

    <ul className="cartWrap">

    { this.state.shoppingCart.map((item, index) => 
    

      <li className="items odd">
        
    <div className="infoWrap"> 
        <div className="cartSection">
          <h3>{item.getName()}</h3>
        
           <p> <input type="text" onBlur={event => this.handleQuantity(item, event) } className="qty" maxLength="3" defaultValue={item.getQuantity()}/> x ${item.getCost().toFixed(2)}</p>
        
          <p className="stockStatus"> In Stock</p>
        </div>  
    
        <div className="prodTotal cartSection">
          <p>${(this.state.shoppingCart[index].getCost() * this.state.shoppingCart[index].getQuantity()).toFixed(2)}</p>
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
 
    <li className="totalRow final"><span className="label">Total</span><span className="value">${(this.state.total).toFixed(2)}</span></li>           
     <li className="totalRow"><Popup trigger={<a href="#" className="btn continue" onClick={this.checkout}>Checkout</a>}  modal position="center center"     closeBtn={true}
>
    <CreditCardInfo checkout={this.checkout}/>
  </Popup></li>
    </ul>
  </div>
</div> 
</div>
     
        )
    }


}


