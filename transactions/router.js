let express=require('express')
let model=require('./model')

let router=express.Router()

//---Retrieve Transactions---
router.get('/',(request, response)=>{
  model.getTransactions((error, data)=>{
    if(error){
      console.log("Error Retrieving Transactions",error);
      response.sendStatus(500)
    }
    else response.status(200).json(data)
  })
})
//---Retrieve Balance---(Required Route)
router.get('/balances', (request, response) => {
  model.getTransactions((error, data) => {
    if (error) {
      console.log("Error Retrieving Balances", error);
      response.sendStatus(500)
    }
    else {
      let payerBalances={}
      for (let entry of data){
        if (payerBalances[entry.payer]){
          payerBalances[entry.payer]+=entry.points
        }
        else{
          payerBalances[entry.payer]=entry.points
        }
      }
      response.status(200).json(payerBalances)
    }
  })
})
//---POST Transactions---(Requireed Route)
router.post('/',(request,response)=>{
  let timestamp=new Date().toISOString()
  if (request.body.timestamp){
    timestamp=request.body.timestamp
  }
  let newInfo=[request.body.payer, request.body.points, request.body.points, timestamp]
  model.postTransactions(newInfo, function(error){
    if (error) {
      console.log("Error Adding Transaction", error);
      response.sendStatus(500)
    }
    else response.sendStatus(200)
  })
})
// ---Spend Points---(Required Route)
router.post('/spend',(request,response)=>{
  model.getTransactions((error, data)=>{
    if (error) {
      console.log("Error Retrieving Transactions", error);
      response.sendStatus(500)
    }
    else {
      let expenditure=request.body.expenditure
      function compare(a,b){
        if(a.timestamp<b.timestamp){
          return -1;
        }
        if (a.timestamp > b.timestamp) {
          return 1;
        }
        return 0
      }
      let payerExpense = {}
      function addExpense(expense){
        if (payerExpense[sortedData[j].payer]) {
          payerExpense[sortedData[j].payer] -= expense
        }
        else {
          payerExpense[sortedData[j].payer] = -expense
        }
      }
      let sortedData=data.sort(compare)
      let i=data.length
      let j=0
      
      while (expenditure>0 && i>0){
        let remainder=0
        if (expenditure > sortedData[j].points){
          expenditure-=sortedData[j].points
          addExpense(sortedData[j].points)
        }
        else {
          remainder = sortedData[j].points - expenditure
          expenditure=0
          addExpense(sortedData[j].points-remainder)
        }
        model.putTransactions([remainder, sortedData[j].rowid],(error)=>{
          if(error) {
            console.log("Error Updating Transaction", error);
            response.sendStatus(500)
          }
          else response.status(200)
        })
        i-=1
        j+=1
      }
      let pointsSpent = []
      for (let entry in payerExpense) {
        pointsSpent.push({ "payer": entry, "points": payerExpense[entry] })
      }
      if (expenditure>0){
        response.status(200).json(["Not enough points from transactions. Remaining expenditure: ${expenditure}", pointsSpent])
      }
      else{
        response.status(200).json(pointsSpent) 
      }      
    }
  })
})

module.exports=router