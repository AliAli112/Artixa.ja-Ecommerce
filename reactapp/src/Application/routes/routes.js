import { AccountsPage } from '../pages/Accounts'
import { RegisterPage } from '../pages/Register'
import { ShoppingCartPage } from '../pages/ShoppingCart'
import { RouteEntries } from '../../Domain Model/Routes'

import axios from 'axios'

const routes = [
    {path: RouteEntries.index, name: 'index', component: RegisterPage }, //Page you want to render put here
    {path: RouteEntries.register, name: 'register', component: RegisterPage },
    {path: RouteEntries.accounts, name: 'accounts', component: AccountsPage },
    {path: RouteEntries.shoppingCart, name: 'shoppingCart', component: ShoppingCartPage }


]

export default routes