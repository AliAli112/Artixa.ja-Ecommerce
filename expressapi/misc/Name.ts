export class Name{
    private first: string;
    private last: string;
    constructor(f: string, l:string){
        this.first = f;
        this.last = l;
    }

    public getFirstName(){
        return this.first;
    }

    public getLastName(){
        return this.last;
    }

    public setFirstName(fname: string){
        return this.first = fname;
    }

    public setLastName(lname: string){
        return this.last = lname;
    }
}