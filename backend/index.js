const express=require('express')

const app=express();
const router=express.Router()




const userRouter=require("./user");
const accountRouter=require("./account");
const resourceRouter=require("./userResources")

router.use("/user",userRouter);
router.use("/account",accountRouter);
router.use("/userResources",resourceRouter);

module.exports= router;


