import {React} from "react"
import {useEffect,useState} from "react"
import {Heading} from "../components/heading"
import {SubHeading} from "../components/subheading"
import {InputBox} from "../components/inputbox"
import {Button} from "../components/button"
import {BottomWarning} from "../components/bottomwarning"
import {useNavigate} from "react-router-dom"
import axios from "axios";


export const Signup=()=>{
    const [firstName,setFirstName]=useState("");
    const [secondName,setSecondName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [x,setx]=useState('')
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')!=null){
            navigate("/dashboard")
        }
    },[x])

    

    return(
        <div className="flex justify-center h-screen bg-gray-300">
            <div className="flex flex-col justify-center ">
                <div className="bg-white px-5 rounded-lg shadow-gray-600">
                    <Heading label={"Sign Up"} />
                    <SubHeading subheading={"Enter your information to create an account"} />
                     <InputBox onChange={(e)=>{
                        setFirstName(e.target.value);
                     }} label={"First Name"} placeholder="John"  />
                    <InputBox onChange={(e)=>{
                        setSecondName(e.target.value);
                     }} label={"Second Name"} placeholder="Doe" />
                    <InputBox onChange={(e)=>{
                        setUsername(e.target.value);
                     }} label={"Email"} placeholder="john123@gmail.com" />
                    <InputBox onChange={(e)=>{
                        setPassword(e.target.value);
                     }} label={"Password"} placeholder="123456" />
                    <Button buttonLabel={"Sign Up"} onClick={async ()=>{

                        try{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            password,
                            firstName,
                            secondName
                        });
                        localStorage.setItem('token',response.data.token);
                        localStorage.setItem('userID',response.data.userID);


                        navigate("/dashboard");
                    }catch(e){
                        console.error(e);
                    }
                        

                    }}  />
                    <BottomWarning warningText={"Already have an account?"} link={"/signin"} linkText={"Sign In"} />
        </div>
        </div>
        </div>
    )
}
