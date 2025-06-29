const express=require('express')
const Router = express.Router;
const {userModel} = require("../db")
const bcrypt= require('bcrypt');
const {z}=require('zod');
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config")

// zod schema for validate input
const userRouter = Router();
    const signupSchema=z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(1),
        lastName:z.string().min(1)
    })
    userRouter.post("/signup",async function(req,res){
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
            await userModel.create({
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
    
    userRouter.post("/signin",async function(req,res)
    {
        const {email,password}=req.body;
        //todo: ideally password should be hashed , and  hence can't compare the user provided password and the databse pasword
        try{
            //step: find user by email
            const user = await userModel.findOne({
                email:email,
            });
            if(!user)
            {
                return res.status(401).json({
                    message:"User not found"
                });
            }
            //step 2: Compare hashed password and bcrypt
            const isPasswordValid = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(401).json({
                    message:"Invalid Credential"
                });
            }
            //step 3: Generate Jwt token if password matches
            
            const token = jwt.sign({
                    id:user._id,
                    email:user.email
            },JWT_USER_PASSWORD,
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
    userRouter.post("/purchases",function(req,res){
        res.json({
            message:"signup endpoint"
        })
    })


module.exports={
    userRouter: userRouter
}