# Fetch Rewards Exercise

## Table of Contents
* Summary
* Documentation
* Technologies Used
* Next Steps

## Summary
A backend developed for the Fetch Rewards exercise. Designed to :
* Add transactions for a specific payer and date. 
* Spend points using the rules above and return a list of { "payer": , "points": } for each call. 
 * Return all payer point balances. 

### Start Up 
After cloning the repository, be sure to install dependencies.
```
npm install
```
To start the backend application use the code below.
```
npm start
```
### Properties and their Types
```
|Name            |Description                                                       |Type    |
|----------------|------------------------------------------------------------------|--------|
|payer           |The name of the payer.                                            |string  |
|points          |The points used in the transaction.                               |integer |
|original_points |The points used in the transaction, saved for historical use.     |integer |
|timestamp       |The UTC time and date when the transaction was made.              |string  |
|expenditure     |The amount of points to spend from transactions.                  |integer |
```
## Routes
The all routes are under localhost:9000 by default. Use Postman to easily make calls to the backend during testing.
### GET/transactions
This route retrieves all transactions within the database. Primarily for development. Request not needed.

Response:
```
[
	{"payer": "Payer 1","points": 500,"original_points": 500,"timestamp": "2021-10-31T02:41:34.378Z","rowid": 1},
	{"payer": "Payer 2","points": -200,"original_points": -200,"timestamp": "2021-10-31T02:41:37.153Z","rowid": 2}
]
```
### GET /transactions/balances

This route retrieves total balances for payers from transactions. Request not needed.

Response:
```
{
	"Payer 1":500,
	"Payer 2":100,
	"Payer 1":1000
}
```
### POST /transactions
This route adds a transaction to the database. Timestamp is optional. Request is needed.

Body Request:
```
{
	"payer":Payer 1,
	"points":1000,
	"timestamp":"2021-10-30T00:56:02.666Z"
}
```
### POST /transactions/spend
This route spends points indicated by expenditure amount from transactions, starting with the oldest. Request is needed.

Body Request:
```
{
	"expenditure":5000
}
```

Response: 

```
[
{"payer": "Payer 1","points": -500},
{"payer": "Payer 2","points": -300},
{"payer": "Payer 3","points": -1500}
]
```
## Technology Used
Node.js, SQL
