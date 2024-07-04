const express=require('express')
const router=express.Router()

const user=require('./User/UserController')


router.post('/login',user.login)


module.exports=router;