const express = require('express');
const Router = express.Router;

const courseRouter = Router();

    courseRouter.get("/purchase",function(req,res){
        res.json({
            message: "signup endpoint"
        })
    })
    
    
    courseRouter.get("/preview",function(req,res){
        res.json({
            message: "signup endpoint"
        })
    })


module.exports={
    courseRouter: courseRouter
}