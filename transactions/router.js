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
    else response.status(200),json({
      "transactions":'data'
    })
  })
})

//---POST Transactions---
router.post('/',(request,response)=>{
  let newInfo=[request.body.payer, request.body.points]
})

module.exports=router