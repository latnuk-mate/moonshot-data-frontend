import { useContext, useEffect, useState } from 'react';
import './App.css'
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import View from './component/View';
import Login from './component/Login';
import Register from './component/Register'
import PrivateRoute from './PrivateRoute';
import { Context } from './UserContext';

const url = import.meta.env.VITE_API_URL;

function App() {
  const [dataset, setDataSet] = useState(null);
  const [primaryData , setPrimaryData] = useState(null);

  const {user} = useContext(Context);



  useEffect(()=>{
    fetch(`${url}/data`, {
      method: 'GET',
      credentials: 'include' 
    })
    .then(res => res.json())
    .then((data) => {
      setDataSet(data.allData);
      setPrimaryData(data.primaryData)
    })
    .catch(err => console.error(err))
  }, []);


return(
        <Router>
        <Routes>
          <Route index element={
            <>
            <Home/>
            </>
            
            } />

        <Route path={'/dashboard'} element={
            <PrivateRoute 
                element={
                  <>
                  <Navbar/>
                  {
                    (dataset) && (
                      <Dashboard 
                      data={dataset} 
                      primaryData={primaryData}
                      />
                    )
                  } 
                </>
                }
            />
          }
          />

          <Route 
            path='/view' 
            element={
                <>
                  <Navbar />
                  <View />
                  </>
          }/>
          
          
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        </Router>

)


}

export default App;
