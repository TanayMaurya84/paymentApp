import {React} from "react"
import {useEffect,useState} from "react"
import {Heading} from "../components/heading"
import {SubHeading} from "../components/subheading"
import {InputBox} from "../components/inputbox"
import {Button} from "../components/button"
import {BottomWarning} from "../components/bottomwarning"

import {useNavigate} from "react-router-dom"
import axios from "axios";

export const Signin=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [x,setx]=useState('')

    const navigate=useNavigate();
    useEffect(()=>{
        if(typeof(localStorage.getItem('token'))!='undefined' && localStorage.getItem('token')!=null){
            navigate("/dashboard")
        }
    },[x])



    return(
        <div className="bg-gray-300 h-screen flex   justify-center">
        <div className="flex  flex-col justify-center rounded-lg ">
        <div className="w-96 bg-white p-4 rounded-lg shadow-gray-600">
            
            <Heading label={"Sign In"} />
            <SubHeading subheading={"Enter your credentials to access your account"} />
            <InputBox onChange={(e)=>{
                setUsername(e.target.value);
            }} label={"Email"} placeholder={"johndoe@example.com"} />
            <InputBox onChange={(e)=>{
                setPassword(e.target.value);
            }} label={"Password"} placeholder={"123456"} />
            
            <Button buttonLabel={"Sign In"} onClick={async ()=>{

                try{
                const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                })
                
                
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('userID',response.data.userID);
                localStorage.setItem('firstName',response.data.firstName);
                localStorage.setItem('secondName',response.data.secondName);
                navigate("/dashboard")
                }catch(e){
                    console.error(e);
                }

            }}  />
            <BottomWarning warningText={"Don't have an account?"} link={"/signup"} linkText={"Sign Up"} />
        </div>
        </div>
        </div>
    )
}
