const express =  require('express')
const mongoose = require("mongoose");


const { userRouter } = require("./routes/user");
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin')
require('dotenv').config();
require("./db"); 
const app=express();
app.use(express.json());
// console.log(process.env.MONGO_URL)

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",courseRouter);

async function main() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");
  
      app.listen(4000, () => {
        console.log(" Server listening on http://localhost:4000");
      });
  
    } catch (err) {
      console.error(" Failed to connect to MongoDB:", err.message);
    }
  }
main()