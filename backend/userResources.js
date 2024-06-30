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
    const name=req.query.name;
    
   
    const regexFirstname = new RegExp(name,"i");  //.toString() not works
    

    
    if(name){
    const usersArray=await User.find({       //returns array of objects satisfying search query 
        $or:[{firstName: regexFirstname },
        {secondName: regexFirstname}]
    })

    res.status(200).json({
        message:usersArray
    });
    }else{
        res.status(200).send("");
    }


})
module.exports= router;
