import express, { Application, Request, Response } from 'express'
import { Connection } from '../misc/Enum'
import cors from 'cors';
import { con } from '../config/database';
import { inventoryrouter } from './routes/Inventoryroute'
import { indexrouter } from './routes/Indexroute'
import { expenserouter } from './routes/Expensesroute'
import { orderrouter } from './routes/Orderroutes'
import { shoppingrouter } from './routes/Shoppingrouter'

export class App {
    app: Application;
    public connection: Connection;

    constructor(
        private port: number,
    )
    {
        this.app =  express();
        this.middlewares();
        this.routes();
        this.connectDB();
    }

    private middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({
            extended: true
        }));
    }

    private routes(){
        this.app.use(indexrouter)
        this.app.use('/inventory', inventoryrouter)
        this.app.use('/shopping', shoppingrouter)
        this.app.use('/accounts', expenserouter)
        this.app.use('/orders', orderrouter)
    }

    public async listen(): Promise<void> {
        await this.app.listen(this.port);
        console.log('Server on port ' + this.port);
    }

    private connectDB(){
        con.connect((err) => {
            if(err){
                this.connection = 0;
                throw err;
            }
            else{
                console.log("Successfully connecting to database");
                this.connection = 1;
            }
        })
    }

}
/*const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/inventory', inventoryrouter);
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
*/
