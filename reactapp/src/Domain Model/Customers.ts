import { User } from './User';
import { Order } from './Orders';

export class Customer extends User{
    private id: number;
    protected password: string;
    private phonenum: string;
    private address: string;
    protected email: string;
    private firstname: string; 
    private lastname: string;
    constructor(email: string,
        password: string,
        id: number,
        phonenum: string, 
        addr: string, 
        fname: string,
        lname: string ){
        super(email, password)

        this.id = id;
        this.phonenum = phonenum;
        this.address = addr;
        this.email = email;
        this.firstname = fname; 
        this.lastname = lname;
        this.password = password;
        
    }
    public getFirstName(){
        return this.firstname;
    }

    public getLastName(){
        return this.lastname;
    }

    public getid(){
        return this.id;
    }

    public getEmail(){
        return this.email
    }

    public getphonenum(){
        return this.phonenum;
    }

    public getaddress(){
        return this.address;
    }

    public getPassword(){
        return this.password;
    }

}

