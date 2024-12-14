import { useContext } from "react"
import { Context } from "../UserContext"
import { Link } from "react-router-dom";


export default function Home(){
    const {user} = useContext(Context);

    return (
        <div className="app_container">
            <div className="max-w-[500px] shadow-md border rounded-md p-3 m-auto mt-20 pb-10">
                <h5 className="capitalize text-lg md:text-3xl text-center">Interactive data visualization application</h5>

                    {
                        user ?(
                            <Link to={"/dashboard"} className="btn bg-gray-800 text-gray-100 mt-10 flex justify-center w-1/2 m-auto">Go to Dashboard</Link>
                        )
                        :
                        (
                            <div className="flex items-center gap-8 justify-center mt-10">
                            <Link to={'/login'} className='btn bg-gray-900 text-white hover:bg-gray-800'>SignIn</Link>
                            <Link to={"/register"} className='btn border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'>Register</Link>
                        </div>
                        )
                    }
            </div>
        </div>
    )
}