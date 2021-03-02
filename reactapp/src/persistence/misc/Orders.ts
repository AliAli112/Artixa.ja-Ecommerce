import { Customer } from './Customers'

export interface Orders{
    id: number;
    owner: Customer;
    shippinglocation: string;
    
}