import {React} from "react"
import {useEffect,useState} from "react"
import {Heading} from "../components/heading"
import {SubHeading} from "../components/subheading"
import {InputBox} from "../components/inputbox"
import {Button} from "../components/button"
import {BottomWarning} from "../components/bottomwarning"
import {User} from "../components/user"
import {useNavigate} from 'react-router-dom'
import axios from "axios"

export const Dashboard=()=>{

    const navigate=useNavigate();
    const [logged,setLogged]=useState('on')
    const [balance,setBalance]=useState(0)
    useEffect(()=>{
        if(localStorage.getItem('token')==null ){
            navigate("/signin")
        }
    },[logged])
    useEffect(()=>{
        async function fetchData(){
        const response=await axios.get("http://localhost:3000/api/v1/account/balance?userid="+localStorage.getItem('userID'),{
            headers:{
                authorization:"Bearer "+localStorage.getItem('token')
                
            } 

        })
        console.log(response.data.Balance)
         
        setBalance(response.data.Balance);

        }
        const bal=fetchData();

        

        

    },[])

    
    const firstname=localStorage.getItem('firstName')

    return(
        <div className="w-full h-screen">
            
            <div className="flex justify-between w-full h-40 items-center shadow">
                <p className="font-extrabold text-2xl  p-4"> Payments App </p>
                <div className="flex justify-between">
                <div><p className="font-bold text-lg p-4"> Hello,{firstname} </p></div>
                <div className="flex flex-col justify-center items-center rounded-full"><p className="rounded-full  bg-gray-400 font-bold text-base p-2">{firstname[0].toUpperCase()}</p></div>
                <div className="px-5">
                <button onClick={()=>{
                    localStorage.removeItem('token')
                    setLogged('off')
                }} className=" px-5  h-full rounded-md bg-gray-900 hover:bg-gray-700 text-white  font-semibold text-base "> Log Out </button>  
                </div>
                </div>
            </div>

            <div className="w-full h-30 py-10 items-center">
                <p className="text-left pl-5 font-extrabold text-lg"> Your Balance  {balance} </p>
            </div>

            <div className="w-full h-20 py-5 items-center">
                <p className="font-extrabold text-lg text-left pl-5 "> Users </p>
            </div>

            <div className="flex flex-col justify-center w-full h-10 py-7 px-4  items-center ">
                <input className="w-full h-15 type-text rounded-sm p-3 border-2 border-slate-200" placeholder="Search Users..." />
            </div>
            <User />
            <User />
            <User />



        </div>
    )
}
