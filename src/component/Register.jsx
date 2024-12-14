import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Context } from '../UserContext';

const url = import.meta.env.VITE_API_URL;


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const {user, setUser} = useContext(Context);

  
  if(user){
    return <Navigate to={'/dashboard'} />
  }

  function register(){

    if(name === "" || email === "" || password === ""){
      alert('provide correct information...')
      return false;
    }

// I am no implementing better validation process for now..

    const payload = {
      name: name,
      email: email,
      password: password
    }

    fetch(`${url}/signup` , {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error(err))
  }


  return (
    <div className='rounded-lg p-5 mt-20 m-auto max-w-[600px] shadow-sm bg-gray-200 text-gray-800'>
      <h5 className='text-center text-2xl mb-5 font-bold'>Registration From</h5>

      <form method='post'>
        <div className="mb-3">
          <input type="text"
                placeholder='Your Name...'
                name='name'
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 rounded-md outline-none px-5'
          />
        </div>

        <div className="mb-3">
          <input type="email"
                placeholder='Your Email...'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 rounded-md outline-none px-5'
          />
        </div>

        <div className="mb-3">
          <input type="password"
                placeholder='Your Password...'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 rounded-md outline-none px-5'
          />
        </div>

        <button type="button" className='block m-auto btn bg-zinc-700 text-zinc-50' onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register;