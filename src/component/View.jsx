import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../UserContext';
import ChartBar from './ChartBar';
import { Link} from 'react-router-dom';


function View() {
  const [items, setItems] = useState(null)

  const {user} = useContext(Context);



    const deserializeData = (encodedData) => {
      if (encodedData) {
        const jsonData = atob(encodedData);
        return JSON.parse(jsonData); 
      }
      return null;
    };


  useEffect(function(){
      const url = new URLSearchParams(location.search);
      console.log(url)
      const arr = ['age', 'gender', 'startdate', 'enddate', 'totaltime', 'timetrend', 'itemDates'];
      const params = {};

      for(let item of arr){
          if(item === 'age'){
            params[item] = Number(url.get(`${item}`))
          }else if(item === 'gender'){
            params[item] = url.get(item)
          }else{
            params[item] = deserializeData(url.get(item))
          }
          
      }

        if(url){
          setItems(params);
        }
      
  }, []);



if(items){
    var bardata = {
    labels: Object.keys(items?.timetrend).map(item => item),
    datasets: [{
      label: 'Total time Spent',
      data: items?.totaltime,
      backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
      borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
      borderWidth: 1
    },        
  ]
  }

  var linedata = {
    labels: items.itemDates, //  get from the url
    datasets: [{
      label: `A Time Trend`,
      data:items?.timetrend["A"],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
      tension: 0.1
    }]
  }
}

  return (
        <div className='app_container'>
        <div className="m-auto shadow-md border p-3 mt-10 max-w-[500px]">
            {
              (user && items) ? (
                <div>
                     <h5 className='text-center text-lg '>data shared By : {user.name}</h5>
                     <h5 className='text-center text-lg text-gray-700'>data of {items.gender} above age {items.age} ranging from &nbsp;
                      {new Date(items.startdate).toDateString()} to &nbsp;
                      {new Date(items.enddate).toDateString()}
                     </h5>
                </div>
              )
              :(
                <div className='text-gray-800'>Your are not authenticated! 
                  <Link to={'/'} className='text-blue-500 ml-5 text-lg'>Login first</Link>
                </div>
              )
            }
        </div>
  
          {
            (user && items) && (
              <ChartBar barData={bardata} lineData={linedata}/>
            )
          }
      </div>
  )
}

export default View;