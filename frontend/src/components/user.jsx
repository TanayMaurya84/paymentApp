import {React} from "react"
import {useNavigate} from "react-router-dom"

export const User=()=>{
    const navigate=useNavigate()
    return(
        <div className="w-full h-25 py-4 px-4 flex justify-between items-center">
            <div className="flex items-center ">
            <div className="rounded-full h-10 w-10 bg-gray-300 flex flex-col justify-center items-center px-4"><p className="font-normal text-base ">U1</p></div>
            <p className="font-bold text-lg pl-3"> User1 </p>
            </div>
            <div >
            <button onClick={()=>{
                navigate("/send")
            }
            } className=" p-3 w-40 h-full rounded-md bg-gray-900 hover:bg-gray-700 text-white  font-semibold text-base "> Send Money </button>
            </div>
        </div>
    )
}
