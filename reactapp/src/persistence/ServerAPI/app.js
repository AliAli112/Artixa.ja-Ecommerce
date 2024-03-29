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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.App = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var database_1 = require("../config/database");
var Inventoryroute_1 = require("./routes/Inventoryroute");
var Indexroute_1 = require("./routes/Indexroute");
var Expensesroute_1 = require("./routes/Expensesroute");
var Orderroutes_1 = require("./routes/Orderroutes");
var App = /** @class */ (function () {
    function App(port, connection) {
        if (connection === void 0) { connection = 0; }
        this.port = port;
        this.app = express_1["default"]();
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    App.prototype.middlewares = function () {
        this.app.use(express_1["default"].json());
        this.app.use(cors_1["default"]());
        this.app.use(express_1["default"].urlencoded({
            extended: true
        }));
    };
    App.prototype.routes = function () {
        this.app.use(Indexroute_1.indexrouter);
        this.app.use('/inventory', Inventoryroute_1.inventoryrouter);
        this.app.use('/accounts', Expensesroute_1.expenserouter);
        this.app.use('/orders', Orderroutes_1.orderrouter);
    };
    App.prototype.listen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.listen(this.port)];
                    case 1:
                        _a.sent();
                        console.log('Server on port ' + this.port);
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.connectDB = function () {
        var _this = this;
        database_1.con.connect(function (err) {
            if (err) {
                _this.connection = 0;
                throw err;
            }
            else {
                console.log("Successfully connecting to database");
                _this.connection = 1;
            }
        });
    };
    return App;
}());
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
