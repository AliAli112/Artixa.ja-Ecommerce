export abstract class User{
    protected email: string;
    protected password: string;
    //private usercookie: string;
    constructor(email: string, pword: string){
        this.email = email;
        this.password = pword;

    }
    public getEmail(){
        
    }
}