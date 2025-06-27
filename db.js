const { default: mongoose } = require("mongoose");
console.log("connected db");
mongoose.connect("mongodb+srv://kajalkri2323:umE9tqnFLfLqXrdk@cluster0.hskwjlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const Schema = mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("courses",courseSchema);
const purchaseModel = mongoose.model("purchase",userSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}