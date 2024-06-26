const express=require('express');
const session=require('express-session')
const cors=require('cors')
const mainRouter=require('./backend/index')

const app=express();
const port=3000;
app.use(cors())
app.use(express.json())
app.use(session({ 
  
    // It holds the secret key for session 
    secret: '12345', 
  
    // Forces the session to be saved 
    // back to the session store 
    resave: true, 
  
    // Forces a session that is "uninitialized" 
    // to be saved to the store 
    saveUninitialized: true,
    cookie:{secure:false}
})) 

app.use("/api/v1",mainRouter)
   // all the /api/v1 requests are directed to mainRouter

app.listen(port,()=>{
    console.log("App is running on port:",port);
});
