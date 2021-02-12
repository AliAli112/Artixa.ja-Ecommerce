import express, { Application, Request, Response } from 'express'
import * as http from 'http';
import cors from 'cors';
import { con } from '../config/database';
import { Inventoryrouter } from './routes/Inventory'


const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;
con.connect((err) => {
    if(err) throw err
    else console.log("Successful");
})

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/inventory', Inventoryrouter);
app.listen(port);

app.get('/', (req: Request, res: Response) => {
    con.query('SELECT * FROM inventory', (err, result) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(result.lenght) res.json(result);
        else res.json({});
    })
})

