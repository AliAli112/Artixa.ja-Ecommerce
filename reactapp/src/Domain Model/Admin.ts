import { User } from '../Domain Model/User'

export class Admin extends User{
    private id: number;
    protected password: string;
    protected email: string;
    constructor(
        email: string,
        password: string,
        id: number){
            
        super(email, password)

        this.id = id;
        this.email = email;
        this.password = password;
        
    }
    public getid(){
        return this.id;
    }

    public getEmail(){
        return this.email
    }

    public getPassword(){
        return this.password;
    }

}