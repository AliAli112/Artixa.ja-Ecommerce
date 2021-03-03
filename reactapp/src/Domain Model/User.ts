export class User{
    protected username: string;
    protected password: string;
    //private usercookie: string;
    constructor(uname: string, pword: string){
        this.username = uname;
        this.password = pword;

    }
    public getUserName(){
        return this.username;
    }

    public setPassword(){
        return this.password;
    }

    public setUserName(){
        return this.password;
    }
}