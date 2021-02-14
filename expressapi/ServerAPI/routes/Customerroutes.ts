import express, { Request, Response } from 'express';
import { con } from '../../config/database';
import { Customer } from '../../misc/Customers'

const customerrouter = express.Router();

/*
customerrouter
    .route("/register")

customerrouter
    .route("/login")

customerrouter
    .route("/:customerid")

*/