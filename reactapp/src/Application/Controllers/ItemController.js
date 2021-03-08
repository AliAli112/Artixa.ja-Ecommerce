import axios from 'axios'

const server = axios.create()

export const getallItems = async () =>{
    try{
        console.log("run")
        let data = await server.get('http://localhost:3005/inventory').then(({data}) =>
        data);
        console.log(data)
        return data;
    }catch(e){
        console.log(e)
    }
}