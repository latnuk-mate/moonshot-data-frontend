import { useContext } from "react";
import { Context } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({element}){

    const {user} = useContext(Context);

    return(
        <div>
            {
                (!user) ?
                <Navigate to={'/'} replace={true} />
                :
                element
            }
        </div>
    )
}