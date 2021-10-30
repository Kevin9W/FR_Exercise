const database=require('../database')
//---GET---
function getTransactions(callback){
  let getTransactionQuery='
  SELECT * FROM transactions'
  database.all(getTransactionQuery,callback)
}
//---POST---
function postTransactions(callback){
  let postTransactionsQuery='
  INSERT INTO transactions VALUES (?,?,?)'
  database.run(postTransactionsQuery,data,callback)
}
module.exports={
  getTransactions,
  postTransactions
}