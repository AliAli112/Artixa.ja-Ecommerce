export const RouteEntries = Object.freeze({
    index: "",
    register: "register",
    accounts: "accounts",
    login:  "login"
  });
  //To be moved to the application layer
  export const Routes = Object.freeze({
    index: RouteEntries.index + "/",
    register: RouteEntries.index + "/" + RouteEntries.register,
    accounts: RouteEntries.index + "/" + RouteEntries.accounts,
    login: RouteEntries.index + "/" + RouteEntries.login
    // auctiondetails: RouteEntries.home + "/" + RouteEntries.auctiondetails,
    // authenticate: RouteEntries.welcome + "/" + RouteEntries.authenticate,
    // myauctions: RouteEntries.home + "/" + RouteEntries.myauctions,
  });