const database=require('../database')
//---GET---
function getTransactions(callback){
  let getTransactionQuery = 'SELECT *, transactions.oid FROM transactions'
  database.all(getTransactionQuery,callback)
}
//---POST---
function postTransactions(data, callback){
  let postTransactionsQuery='INSERT INTO transactions VALUES (?,?,?,?)'
  database.run(postTransactionsQuery,data,callback)
}
//---PUT for Spend----
function putTransactions(points, callback) {
  let putTransactionsQuery = "UPDATE transactions SET points=? WHERE transactions.oid=?"
  console.log(points)
  database.run(putTransactionsQuery, points, callback)
}
module.exports={
  getTransactions,
  postTransactions,
  putTransactions
}