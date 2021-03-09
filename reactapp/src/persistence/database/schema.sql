DROP DATABASE IF EXISTS Artixa;
CREATE DATABASE Artixa;
USE Artixa;


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
    cus_id INT auto_increment,
    customerFirstName varchar(255),
    customerLastName varchar(255),
    customerAddress varchar(255),
    customerPhoneNumber varchar(255),
    customerOrders Text(1000),
    customerEmail varchar(255),
    customerPassword varchar(255),
    PRIMARY KEY(cus_id)
);

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    id INT auto_increment,
    cus_id INT,
    items varchar(255),
    shippingLocation varchar(255),
    status INT,
    total decimal(10,2),
    PRIMARY KEY(id),
    FOREIGN KEY(cus_id) REFERENCES Customers(cus_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Expenses;
CREATE TABLE Expenses (
    id INT auto_increment,
    expenseName varchar(255),
    expenseAmount decimal(10,2),
    expensetype INT,
    PRIMARY KEY(id)
);
