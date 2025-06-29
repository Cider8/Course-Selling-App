const express = require('express');
const Router = express.Router;
const {usermiddleware} = require("../middleware/user");
const { purchaseModel, courseModel } = require('../db');
const courseRouter = Router();

    courseRouter.post("/purchase",usermiddleware,async function(req,res){
        const userId = req.userId;
        const courseId = req.body.courseId;
        //check user actually paid the price
        await purchaseModel.create({
            userId,
            courseId
        })
        res.json({
            message: "You have successfully bought courses"
        })
    })
    
    
    courseRouter.get("/preview",async function(req,res){
        const courses = await courseModel.find({})
        res.json({
            courses
        })
    })


module.exports={
    courseRouter: courseRouter
}