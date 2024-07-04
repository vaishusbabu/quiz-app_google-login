const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/quiz-app")

var db=mongoose.connection

db.on("error",console.error.bind("error"))

db.once("open",function(){
    console.log("Connection Successfull")
})

module.exports=db