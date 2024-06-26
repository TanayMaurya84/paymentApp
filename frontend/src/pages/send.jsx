import React from "react"
import {useNavigate,Link} from "react-router-dom"

export const SendMoney=()=>{
    const navigate=useNavigate()

    return(
        <div className="h-screen flex justify-center bg-gray-300">
        <div className="flex flex-col justify-center ">
        <div className="w-96 h-96 bg-white shadow-sm shadow-gray-600">
            
            <button className="pt-4 pl-4"><svg onClick={()=>{
                navigate("/dashboard")
            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg></button>
            <div className="flex  justify-center">
                <p className="px-10 pb-10 pt-3 font-extrabold text-4xl"> Send Money </p>
            </div>


            <div className=" px-5 ">
                
                <div className="flex  items-center ">
                    <div className="flex justify-center items-center h-10 w-10 rounded-full bg-green-500">
                        <p className="p-8 font-semibold  text-white text-sm"> A </p>
                    </div>

                    <div >
                        <p className="font-bold text-xl pl-2"> Friend's Name </p>
                    </div>
                </div>

                <div className="py-2 justify-center">
                    <label className="font-semibold text-base" > Amount (in $) </label>
                    <input type="number" className="w-full h-30   border-3 outline-3 outline-gray-600  rounded-sm p-2" placeholder="Enter amount" />
                </div>

                <div className="py-2">
                    <button className="w-full h-30 bg-green-400 hover:bg-green-700 text-center text-white font-bold font-sm py-4 rounded-md"> Initiate Transfer </button>
                </div>

            </div>




        </div>
        </div>
        </div>
    )
}
