
import {React} from "react";
import { Link, useNavigate } from "react-router-dom";

export const BottomWarning=({warningText,link,linkText})=>{
    return(
        <div className="flex justify-center  items-center px-10 py-2 text-center">
        <div className="text-sm font-normal">
            {warningText}
        </div>
        <Link to={link}>
            <span className="text-sm font-semibold underline">{linkText}</span>
        </Link>
        </div>
    )
}
