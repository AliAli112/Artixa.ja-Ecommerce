import { AccountsPage } from '../pages/Accounts'
import { RegisterPage } from '../pages/Register'
import { RouteEntries } from '../misc/Routes'

const routes = [
    {path: RouteEntries.index, name: 'index', component: RegisterPage }, //Page you want to render put here
    {path: RouteEntries.register, name: 'register', component: RegisterPage },
    {path: RouteEntries.accounts, name: 'accounts', component: AccountsPage },

]

export default routes