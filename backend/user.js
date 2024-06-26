const express=require('express')
const zod=require('zod')
const router=express.Router()
const {User,Account}=require("../db")
const jwt=require("jsonwebtoken")
//const { JWT_SECRET }=require("../config")

const JWT_SECRET="123456789";

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    secondName:zod.string()
})

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})


router.post("/signup",async (req,res)=>{
    const {success}=signupSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const existingUser=await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"User already exists"
        })
    }

    const user=await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        secondName:req.body.secondName
    })

    const userId=user._id;

    const amount=(Math.random()*10000)+1
    await Account.create({
        userID:userId,
        balance:amount
    })

    const token=jwt.sign({
        userId
    }, JWT_SECRET);

    /*const headers={
        "authorization":('Bearer '+token),
        "userID":user._id
    }
    let userHeaders=new Headers(headers);*/
    req.session.userID=userId;
    req.session.token=token;

    res.json({
        message:"User created successfully",
        token:token,
        userID:user._id,
        firstName:user.firstName,
        secondName:user.secondName

    })



})

router.post("/signin",async function(req,res){
    const {success}=signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs!"
        })
    }

    const user=await User.findOne(
        { username:req.body.username,
            password:req.body.password
        }
    )
    if(user){
    
    const token=jwt.sign({userID:user._id},JWT_SECRET);

    
    /*const headers={
        "authorization":('Bearer '+token),
        "userID":user._id
    }
    let userHeaders=new Headers(headers);*/
    req.session.userID=user._id;
    req.session.token=token;


    return res.status(200).json({
        token:token,
        userID:user._id,
        firstName:user.firstName,
        secondName:user.secondName
    })
    }

    return res.status(411).json({
        message:"Error while logging in!"
    })
})

module.exports= router;

