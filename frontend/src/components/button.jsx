import {React} from "react";

export const Button=({buttonLabel,onClick})=>{
    return(
            <div className="px-10 py-5 ">
            <button onClick={onClick} className="w-72 h-10 px-10 py-5 bg-gray-800 hover:bg-gray-900  text-white font-sm rounded-md flex  justify-center items-center ">{buttonLabel}</button>
            </div>
    )
}
