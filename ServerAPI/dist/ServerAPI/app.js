"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("../config/database");
const Inventory_1 = require("./routes/Inventory");
const app = express_1.default();
const server = http.createServer(app);
const port = 3000;
database_1.con.connect((err) => {
    if (err)
        throw err;
    else
        console.log("Successful");
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/inventory', Inventory_1.Inventoryrouter);
app.listen(port);
app.get('/', (req, res) => {
    database_1.con.query('SELECT * FROM inventory', (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (result.lenght)
            res.json(result);
        else
            res.json({});
    });
});
//# sourceMappingURL=app.js.map