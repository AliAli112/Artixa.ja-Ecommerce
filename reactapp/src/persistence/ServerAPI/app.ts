import express, { Application, Request, Response } from 'express'
import { Connection } from '../misc/Enum'
import cors from 'cors';
import { con } from '../config/database';
import { inventoryrouter } from './routes/Inventoryroute'
import { indexrouter } from './routes/Indexroute'
import { expenserouter } from './routes/Expensesroute'
import { orderrouter } from './routes/Orderroutes'
import { customerrouter } from './routes/Customerroutes'
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

export class App {
    app: Application;
    public connection!: Connection;

    constructor(
        private port: number,
        connection = 0,
    )
    {
        this.app =  express();
        this.middlewares();
        this.routes();
        this.connectDB();

    }

    private middlewares(){
        this.app.use(express.json());
        this.app.use(cors({
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
            credentials: true
        }));
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser());
        this.app.use(session({
            secret: "babylon",
            resave: false,
            saveUninitialized: true,
            cookie: { expires: new Date("2021-03-25")}

        }))
    }

    private routes(){
        this.app.use(indexrouter)
        this.app.use('/inventory', inventoryrouter)
        this.app.use('/accounts', expenserouter)
        this.app.use('/orders', orderrouter)
        this.app.use('/customer', customerrouter)
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
