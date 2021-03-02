export const RouteEntries = Object.freeze({
    index: "",
    register: "register",
    accounts: "accounts",
  });
  
  export const Routes = Object.freeze({
    index: RouteEntries.index,
    register: RouteEntries.index + "/" + RouteEntries.register,
    accounts: RouteEntries.index + "/" + RouteEntries.accounts
    // auctiondetails: RouteEntries.home + "/" + RouteEntries.auctiondetails,
    // authenticate: RouteEntries.welcome + "/" + RouteEntries.authenticate,
    // myauctions: RouteEntries.home + "/" + RouteEntries.myauctions,
  });