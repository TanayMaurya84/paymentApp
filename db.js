

require('dotenv').config();
const mongoose=require('mongoose')
const mongoURI = process.env.MONGODB_URI;


mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connected to database successfully")
    })
    .catch((err)=>{
        console.error(err)
    })


//defining schema
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    secondName:String
});

const User=mongoose.model('Paytm',userSchema);
//model/object creation




//Accounts table

const accountSchema=new mongoose.Schema({
    userID:{
        type:String,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account=mongoose.model('Accounts',accountSchema)

module.exports={
    User,Account
}


