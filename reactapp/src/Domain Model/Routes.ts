export const RouteEntries = Object.freeze({
    index: "/",
    register: "register",
    accounts: "accounts",
    shoppingCart: "shoppingCart"
  });
  
  export const Routes = Object.freeze({
    index: RouteEntries.index,
    register: RouteEntries.index + "/" + RouteEntries.register,
    accounts: RouteEntries.index + "/" + RouteEntries.accounts,
    shoppingCart: RouteEntries.index + "/" + RouteEntries.shoppingCart
    // auctiondetails: RouteEntries.home + "/" + RouteEntries.auctiondetails,
    // authenticate: RouteEntries.welcome + "/" + RouteEntries.authenticate,
    // myauctions: RouteEntries.home + "/" + RouteEntries.myauctions,
  });