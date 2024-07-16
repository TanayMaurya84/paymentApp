const express=require("express")
const app=express()
const {Account}=require("../db")

const router=express.Router()
const {authMiddleware}=require('./middleware');
const { default: mongoose } = require("mongoose");
const {userHeaders}=require("./user")

//app.use(authMiddleware);

router.get("/balance",authMiddleware,async function(req,res){
    const userId=req.query.userid;
    //console.log(req.session)

    try{
    const details=await Account.findOne({
        userID:userId
    })
    const balance=details.balance;

    return res.status(200).json({
        Balance:balance
    })
    }catch(e){
        return res.status(411).json({
            message:"An unexpected error occured in balance detection!"
        })
    }



})

router.post("/transfer",authMiddleware,async function(req,res){
    const to=req.body.to;
    const amount=req.body.amount;
    console.log(1);
    const Session=await mongoose.startSession();
    console.log(2);
    Session.startTransaction();
    console.log(3);
    
        
        const fromAccount=await Account.findOne({
            userID:req.headers.userID
        }).session(Session);

        if(!fromAccount || fromAccount.balance<amount){
            await Session.abortTransaction();
            return res.status(400).json({
                message:"Insufficient balance!"
            })
        }
        console.log(4);
        const toAccount=await Account.findOne({
            userID:to
        }).session(Session)

        if(!toAccount){
            await Session.abortTransaction();
            return res.status(400).json({
                message:"Invalid Account!"
            })
        }
        console.log(5);
        await Account.updateOne(
            {userID:req.headers.userID},
            {$inc:{
                balance:-amount
            }}

        ).session(Session);

        await Account.updateOne({
            userID:to},
            {$inc:{
                balance:amount
            }

        }).session(Session)
        
        console.log(6);
        await Session.commitTransaction();
        console.log(7);
        res.json({message:"Transaction Successful!"})
        //return true;
        Session.endSession();
        console.log(8);
        



    })



module.exports= router;


