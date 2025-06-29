const express=require('express')
const Router= express.Router;

const adminRouter = Router();
const {adminModel, courseModel} = require("../db")
const bcrypt= require('bcrypt');
const {z}=require('zod');
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} =require("../config")
const course = require('./course');
const { adminmiddleware } = require('../middleware/admin');

// zod schema for validate input
const userRouter = Router();
    const signupSchema=z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(1),
        lastName:z.string().min(1)
})


//bcrypt,zod,jsonwebtoken

adminRouter.post("/signup",async function(req,res){
    // input validation
    const parseResult = signupSchema.safeParse(req.body);
    if(!parseResult.success)
    {
        return res.status(500).json({
            message:"Invalid Input",
            errors:parseResult.error.errors
        })
    }
    const {email,password,firstName,lastName} = parseResult.data;
    //todo:adding zod validation
    //hash the password
    //put these things in try catch block
    try{

        //hash apssword
        const hashpassword=await bcrypt.hash(password,10);
        await adminModel.create({
            email:email,
            password: hashpassword,
            firstName:firstName,
            lastName:lastName
        })
        res.json({
            message: "signup succeeded"
        })
    }catch(error){
        console.log("Signup failed:",error);
        res.status(500).json({
            message:"signup failed",
            error: error.message
        });
    }
})

adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
        //todo: ideally password should be hashed , and  hence can't compare the user provided password and the databse pasword
        try{
            //step: find user by email
            const admin = await adminModel.findOne({
                email:email,
            });
            if(!admin)
            {
                return res.status(401).json({
                    message:"User not found"
                });
            }
            //step 2: Compare hashed password and bcrypt
            const isPasswordValid = await bcrypt.compare(password,admin.password);
            if(!isPasswordValid){
                return res.status(401).json({
                    message:"Invalid Credential"
                });
            }
            //step 3: Generate Jwt token if password matches
            
            const token = jwt.sign({
                    id:admin._id,
                    email:admin.email
            },JWT_ADMIN_PASSWORD,
            {expiresIn: "1h"}//token expiration
            );
            res.json({
                    meassage:"Signin Successful",
                    token:token
            });
        }catch(error){
            console.log("Sigin failed:",error);
            res.status(500).json({
                message:"signin failed",
                error: error.message
            });
        }
})

adminRouter.post("/course",adminmiddleware,async function(req,res){//create course
    const adminId  = req.userId;

    const{title, description, imageUrl,price} = req.body;
    //creating a web3 saas
    const course= await courseModel.create({
        title: title, 
        description: desacription, 
        imageUrl: imageUrl,
        price: price,
        creatorId:adminId
    })
    
    res.json({
        message: " course created " ,
        courseId: course._id
    })
})

adminRouter.put("/course",adminmiddleware,async function(req,res){//change course
    const adminId=req.userId;

    const {title,description,imageUrl,price,courseId}=req.body;
    const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId// this is protecting db when creator updating each other database
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    res.json({
        message: "Course Updated",
        courseId:course._id 
    })
})

adminRouter.get("/course",adminmiddleware,async function(req,res){//get course
    const adminId = req.userId;
    const course = await courseModel.find({
        creatorId:adminId
    })
   
    res.json({
        message: " get all courses",
        courseId:course._id 
    })
})

module.exports={
    adminRouter: adminRouter
}