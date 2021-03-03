DROP DATABASE IF EXISTS Artixa;
CREATE DATABASE Artixa;
USE Artixa;

--Might change id auto update becuz of the attribute 'id' of classes probably need to match

DROP TABLE IF EXISTS Inventory;
CREATE TABLE Inventory (
    id INT auto_increment,
    itemName varchar(255),
    itemQuantity INT,
    itemDescription Text(1000),
    itemCost decimal(10,2),
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
    id INT auto_increment,
    customerUsername varchar(255),
    customerFirstName varchar(255),
    customerLastName varchar(255),
    customerAddress varchar(255),
    customerPhoneNumber varchar(255),
    customerEmail varchar(255),
    customerPassword varchar(255),
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    id INT auto_increment,
    shippingLocation varchar(255),
    -- customerFirstName varchar(255),
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES Customers(id) ON DELETE CASCADE,
    -- FOREIGN KEY(customerFirstName) REFERENCES Customers(customerFirstName) ON DELETE CASCADE,
    FOREIGN KEY(id) REFERENCES Inventory(id) ON DELETE CASCADE,
);

-- DROP TABLE IF EXISTS Invoices;
-- CREATE TABLE Invoices (
--     id INT auto_increment,
--     customerID INT,
--     orderName varchar(255),
--     orderCost decimal(10,2),
--     orderSubtotal decimal(10,2),
--     itemNames Text(1000),
--     itemQuantity varchar(255),
--     orderLocation varchar(255),
--     orderPlacedDate DATE,
--     orderStatus varchar(25),
--     PRIMARY KEY(id),
--     FOREIGN KEY(id) REFERENCES Customers(id) ON DELETE CASCADE
-- );

DROP TABLE IF EXISTS Expenses;
CREATE TABLE Expenses (
    id INT auto_increment,
    expenseName varchar(255),
    expenseAmount decimal(10,2),
    expensetype INT,
    PRIMARY KEY(id)
);
