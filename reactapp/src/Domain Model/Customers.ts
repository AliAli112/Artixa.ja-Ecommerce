import { User } from './User';

export class Customer extends User{
    private id: number;
    // private username: string;
    // private password: string;
    private phonenum: string;
    private address: string;
    private email: string;
    private firstname: string; 
    private lastname: string;
    constructor(username: string,
        password: string,
        id: number,
        phonenum: string, 
        addr: string, 
        email: string, 
        fname: string,
        lname: string ){
        super(username, password)

        this.id = id;
        this.phonenum = phonenum;
        this.address = addr;
        this.email = email;
        this.firstname = fname; 
        this.lastname = lname;
        
    }
    public getFirstName(){
        return this.firstname;
    }

    public getLastName(){
        return this.lastname;
    }

    public setFirstName(fname: string){
        return this.firstname = fname;
    }

    public setLastName(lname: string){
        return this.lastname = lname;
    }

    public getid(){
        return this.id;
    }

    public getphonenum(){
        return this.phonenum;
    }

    public getaddress(){
        return this.address;
    }
}

