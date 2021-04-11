import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,} from './NavbarElements';
import {Routes} from '../../Domain Model/Routes';
  
const NavbarAdmin = () => {
    if(JSON.parse(sessionStorage.getItem('user') || '{}').isloggedIn === 'admin'){
        return (
            <>
              <Nav>
                <Bars />
          
                <NavMenu>
                  <NavLink to={Routes.inventory} activeStyle>
                    Inventory
                  </NavLink>
                  <NavLink to={Routes.orders} activeStyle>
                    Order Collator
                  </NavLink>
                  <NavLink to={Routes.accounts} activeStyle>
                    Accounts
                  </NavLink>
                  {/* <NavLink to={Routes.reports} activeStyle> */}
                    {/* Teams */}
                  {/* </NavLink> */}
                  {/* Second Nav */}
                  {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                  <NavBtnLink to={Routes.index}>Logout</NavBtnLink>
                </NavBtn>
              </Nav>
            </>
          );
        }
}

const Navbar = () => {
  if(JSON.parse(sessionStorage.getItem('user') || '{}').isloggedIn !== 'admin' && 
      JSON.parse(sessionStorage.getItem('user') || '{}').isloggedIn !== false ){
    return (
      <>
        <Nav>
          <Bars />
    
          <NavMenu>
            {/* <NavLink to={Routes.myorders} activeStyle> */}
              {/* My Orders */}
            {/* </NavLink> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to={Routes.index}>Logout</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    )
  } else{
    return(
      <div>here</div>
    )
  }
}

  
export {Navbar , NavbarAdmin} ;