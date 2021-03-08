"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("../config/database");
const Inventoryroute_1 = require("./routes/Inventoryroute");
const Indexroute_1 = require("./routes/Indexroute");
const Expensesroute_1 = require("./routes/Expensesroute");
const Orderroutes_1 = require("./routes/Orderroutes");
const Customerroutes_1 = require("./routes/Customerroutes");
class App {
    constructor(port, connection = 0) {
        this.port = port;
        this.app = express_1.default();
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.urlencoded({
            extended: true
        }));
    }
    routes() {
        this.app.use(Indexroute_1.indexrouter);
        this.app.use('/inventory', Inventoryroute_1.inventoryrouter);
        this.app.use('/accounts', Expensesroute_1.expenserouter);
        this.app.use('/orders', Orderroutes_1.orderrouter);
        this.app.use('/customer', Customerroutes_1.customerrouter);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.port);
            console.log('Server on port ' + this.port);
        });
    }
    connectDB() {
        database_1.con.connect((err) => {
            if (err) {
                this.connection = 0;
                throw err;
            }
            else {
                console.log("Successfully connecting to database");
                this.connection = 1;
            }
        });
    }
}
exports.App = App;
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
//# sourceMappingURL=app.js.map