import React, { useContext} from 'react'
import { Link} from 'react-router-dom';
import { Context } from '../UserContext';

const url = import.meta.env.VITE_API_URL;

function Navbar() {

  const {user, setUser} = useContext(Context);

  function LogOut(){
    fetch(`${url}/logout`, {
      method: "GET",
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      alert(data);
      setUser(null)
    })
    .catch(err => console.log(err));
  }


  
  return (
    <div className='py-5 shadow-md'>
        <div className="flex justify-between items-center app_container">
            <h5 className='text-gray-900 text-3xl'>Interactive Dashboard</h5>
            
          {
            !user ? (
              <div className="flex items-center gap-8">
              <Link to={'/login'} className='btn bg-gray-900 text-white hover:bg-gray-800'>SignIn</Link>
              <Link to={"/signup"} className='btn border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'>Register</Link>
            </div>
            ):
            (
            <div className="flex items-center gap-5">
                <Link to={'/'} className='btn bg-gray-900 text-white hover:bg-gray-800'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </Link>

              <button className="btn bg-gray-900 text-white hover:bg-gray-800" onClick={LogOut}>Log Out</button>
             </div>
            )
          }
        </div>
    </div>
  )
}

export default Navbar;