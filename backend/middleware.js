const express=require('express')
//const { JWT_SECRET }=require("../config")
const jwt=require("jsonwebtoken")

const JWT_SECRET="123456789"

function authMiddleware(req,res,next){
    

    const authHeader=req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(411).json({
            message:"An unexpected error occured in authHeader"
        });
    }
    
    const token=authHeader.split(' ')[1];
    try{
        
        const verifyToken=jwt.verify(token,JWT_SECRET);
        next();
        //return res.status(200).json({})

    }catch(e){
        return res.status(412).json({
            message:"An unexpected error occured in authMiddleware"
        });
    }
    



}

module.exports= {authMiddleware};
