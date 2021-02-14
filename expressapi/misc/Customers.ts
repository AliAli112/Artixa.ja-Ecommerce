import { User } from './User';
import { Name } from './Name';

export class Customer extends User{
    // private username: string;
    // private password: string;
    private id: number;
    private phonenum: string;
    private address: string;
    private email: string;
    private Name: Name;
    constructor(username: string, password: string){
        super(username, password)
        
    }

}