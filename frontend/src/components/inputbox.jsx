import {React} from "react"

export const InputBox=({label,placeholder,onChange})=>{
    return(
    <div className=" ">
        
        <label className="font-semibold text-base text-left">{label}</label>
        <input onChange={onChange} className="rounded-sm w-full h-10 p-2 border-2" placeholder={placeholder}></input>
    </div>
    )
}
