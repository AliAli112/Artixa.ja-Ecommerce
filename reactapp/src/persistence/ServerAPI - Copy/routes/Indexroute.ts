import express, { Request, Response } from 'express';
import { con } from '../../config/database';

const indexrouter = express.Router();

indexrouter
    .route("/")
    .get((req: Request, res: Response) => {
        res.send("/inventory for INVENTORY"+'\n'+ "/accounts for EXPENSES")
    });

export { indexrouter }