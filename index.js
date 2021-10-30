const express=require("express")
const trnsactionsRouter=require("./transactions/router")

let app=express()
const PORT=9000

app.use(express.json())

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Get, Post, Put, Delete");
  next();
});

app.get('/',(request, response)=>{
  response.status(200).send("It Lives!!!")
})

app.use('/transactions',transactionsRouter)

app.listen(PORT,()=>{
  console.log("App is listening on PORT:${PORT}")
})