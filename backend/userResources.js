const express=require('express');
const app=express();
const {authMiddleware}=require("./middleware");
const router=express.Router()
const {User}=require("../db")

//app.use(authMiddleware);

router.put("/update",authMiddleware,async function(req,res){
    const username=req.body.username;
    const newPassword=req.body.password;
    const filter={username:username};
    const update={password:newPassword};

    try{
        const changed=await User.findOneAndUpdate(filter,update,{new:true});
        //console.log(changed)
        
        return res.status(200).json({
            message:"Updated Successfully!"
        })

    }catch{
        
        return res.status(411).json({
            message:"An unexpected error occured"
        })
    }

    })



router.get("/otherUsers",authMiddleware,async function(req,res){
    const firstname=req.query.firstname;
    const secondname=req.query.secondname;

    const regexFirstname = new RegExp(firstname).toString(); 
    const regexSecondname = new RegExp(secondname).toString();

    const usersArray=await User.find({       //returns array of objects satisfying search query 
        $or:[{firstName:{ regexFirstname} },
        {secondName:{ regexSecondname}}]
    })

    res.status(200).json({
        message:usersArray
    });


})
module.exports= router;
