const express=require('express')
const Router= express.Router;

const adminRouter = Router();

//app.use(adminMiddleware)

adminRouter.post("/signup",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin",function(req,res){
    res.json({
        message: " Signup endpoint" 
    })
})

adminRouter.post("/course",function(req,res){//create course
    res.json({
        message: " Signup endpoint" 
    })
})

adminRouter.put("/course",function(req,res){//change course
    res.json({
        message: " Signup endpoint" 
    })
})

adminRouter.get("/course",function(req,res){//get course
    res.json({
        message: " Signup endpoint" 
    })
})

module.exports={
    adminRouter: adminRouter
}