let sqlite3=require('sqlite3')
let database=new sqlite3.Database('./database.db')

const createTransactionsTableQuery="CREATE TABLE IF NOT EXISTS transactions (payer TEXT, points INTEGER, original_points INTEGER, timestamp TEXT)"

database.run(createTransactionsTableQuery, error =>{
  if (error) console.error(new Error('Create transactions table failed.'), error);
  else console.log('Create transaction table succeeded')
});

module.exports = database;