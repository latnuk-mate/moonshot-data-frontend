import React, { createContext, useEffect, useState } from 'react'

const url = import.meta.env.VITE_API_URL;

export const Context = createContext({});

function UserContext({children}) {
    const [user , setUser] = useState(null);


useEffect(function(){
        fetch(`${url}/user`,  {
          method: 'GET',
          credentials: 'include' 
        })
        .then(res => {
            if(!res.ok){
              throw new Error('error')
            }
          return res.json()})
        .then(data => {   
          setUser(data);
        })
        .catch(err => console.log(err))
  }, []);





  return (
    <Context.Provider value={{user, setUser}}>
        {children}
    </Context.Provider>
  )
}

export default UserContext;