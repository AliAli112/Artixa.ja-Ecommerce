export const RouteEntries = Object.freeze({
    index: "",
    register: "register",
    accounts: "accounts",
    login:  "login",
    dashboard: "admin",
    shoppingCart: "shoppingCart",
    inventory: "inventory",
    orders: "orders",
    itemcatalog: "item",
    myorders: "myorders",
    expenses: "expenses"
  });
  //To be moved to the application layer
  export const Routes = Object.freeze({
    index: RouteEntries.index + "/",
    register: RouteEntries.index + "/" + RouteEntries.register,
    accounts: RouteEntries.index + "/" + RouteEntries.accounts,
    login: RouteEntries.index + "/" + RouteEntries.login,
    dashboard: RouteEntries.index + "/" + RouteEntries.dashboard,
    shoppingCart: RouteEntries.index + "/" + RouteEntries.shoppingCart,
    inventory: RouteEntries.index + "/" + RouteEntries.inventory,
    orders: RouteEntries.index + "/" + RouteEntries.orders,
    itemcatalog: RouteEntries.index + "/" + RouteEntries.itemcatalog,
    myorders: RouteEntries.index + "/" + RouteEntries.myorders,
    expenses: RouteEntries.index + "/" + RouteEntries.expenses


    // auctiondetails: RouteEntries.home + "/" + RouteEntries.auctiondetails,
    // authenticate: RouteEntries.welcome + "/" + RouteEntries.authenticate,
    // myauctions: RouteEntries.home + "/" + RouteEntries.myauctions,
  });