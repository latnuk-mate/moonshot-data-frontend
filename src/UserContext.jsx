import React, { createContext, useEffect, useState } from 'react'
import Loading from './component/Loading';

const url = import.meta.env.VITE_API_URL;

export const Context = createContext({});

function UserContext({children}) {
    const [user , setUser] = useState(null);
    const [ready, setIsReady] = useState(false);


useEffect(function(){
      console.log('from the context')
        fetch(`${url}/user`,  {
          method: 'GET',
          credentials: 'include' 
        })
        .then(res => res.json())
        .then(data => {
            if(data && data.user !== null){
              setUser(data.user);
            }else{
              setUser(data.user) // set by default null
            }
            setIsReady(true);
        })
        .catch(err => console.log(err))
  }, []);


  if(!ready){
    return <Loading />
  }



  return (
    <Context.Provider value={{user, setUser}}>
        {children}
    </Context.Provider>
  )
}

export default UserContext;