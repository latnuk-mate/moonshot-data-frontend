import React, { useState, useEffect, useRef } from 'react';
import { getElementsAtEvent} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, TimeScale, PointElement } from 'chart.js';

import "react-datepicker/dist/react-datepicker.css";
import { format, addDays,parse} from 'date-fns';

import 'chartjs-adapter-date-fns';
import ChartBar from './ChartBar';
import Filter from './Filter';


        // Registering required Chart.js components
        ChartJS.register(
          CategoryScale,
          LinearScale,
          BarElement,
          Title,
          Tooltip,
          Legend,
          LineElement,
          TimeScale,
          PointElement
        );

export default function Dashboard({data, primaryData}){

          // State for charts and filters
          const [barData, setBarData] = useState({ labels: [], datasets: [] });
          const [lineData, setLineData] = useState({ labels: [], datasets: [] });
          const [ageFilter, setAgeFilter] = useState(primaryData?.age || '15-25');
          const [genderFilter, setGenderFilter] = useState(primaryData?.gender || 'Male');
          const [startDate, setStartDate] = useState(primaryData?.startdate !== undefined ? new Date(primaryData.startdate) : parseDate("4/12/2022")); // initial date
          const [endDate, setEndDate] = useState(primaryData?.enddate !== undefined ? new Date(primaryData.enddate) : addDays(startDate, 7));
          const [filterData, setFilterData] = useState(null);
          const [totalTimeSpent, setTotalTimeSpent] = useState(primaryData?.totalTime || []);
          const [timeTrend, setTimeTrend] = useState(primaryData?.timeTrend || []);
          const [itemDates , setItemDates] = useState([]);

      
          const axis = ["A", "B", "C", "D", "E", 'F'];
          const bar = useRef();

            //  function to parse date into correct date format
            function parseDate(date){
              const d = parse(date, 'dd/MM/yyyy', new Date());
              return d;
          }


         useEffect(()=>{
          
            const filteredData = () =>{
                  var filterDate = data.filter(item => {
                   const itemDate = parseDate(item.Day)
   
                   return itemDate >= startDate && 
                       itemDate <= endDate && item.Gender == genderFilter 
                       && item.Age == ageFilter;
   
                 // returning one week data of male candidate and are between 15 - 25

                 });
                
                 setFilterData(filterDate);

              }

              filteredData();

              setBarData({
                labels: axis,
                datasets: [{
                  label: 'Total time Spent',
                  data: totalTimeSpent,
                  backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
                  borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
                  borderWidth: 1
                },        
              ]
              });
  
              setLineData({
                labels: itemDates,
                datasets: [{
                  label: `A Time Trend`,
                  data:timeTrend["A"],
                  borderColor: 'rgba(75,192,192,1)',
                  fill: false,
                  tension: 0.1
                }]
              });


   
          }, [startDate, endDate, ageFilter, genderFilter]);
    

       useEffect(function(){
            if(filterData){
                // function to display week range...
                setItemDates(() => {
                  const itemDates = filterData.map(item => {
                    const date = parseDate(item.Day);
                    return format(date, 'd MMM')
                  });

                  return itemDates;
                })


            function getTimeTrend(){
              const trendData = filterData.map(item => {
                const {Age, Gender, Day, ...rest} = item;
                    return rest;
                });
             
    
                  if(trendData){
                    var keys = Object.keys(trendData[0]);
                  }
  
                  const timeTrend = keys.reduce((acc, key) => {
                      acc[key] = trendData.map(row => row[key]);
                      return acc;
                  }, {});


                  return timeTrend;
            }


              // total time spent...
           function timeSpent(){
                const totalTime = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
                  
                filterData.map(item => {
                  const {Age, Gender, Day, ...rest} = item;
                      
                    Object.keys(rest).forEach(key => {
                        totalTime[key] += item[key]
                    });
                });
  
                const totalTimeSpent = Object.values(totalTime).map(item => item);
  
                return totalTimeSpent;
            }

            setTotalTimeSpent(timeSpent());

            setTimeTrend(getTimeTrend());


            
            setBarData({
              labels: axis,
              datasets: [{
                label: 'Total time Spent',
                data: totalTimeSpent,
                backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
                borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
                borderWidth: 1
              },        
            ]
            });

            setLineData({
              labels: itemDates,
              datasets: [{
                label: `A Time Trend`,
                data:timeTrend["A"],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                tension: 0.1
              }]
            });

            }


          }, [filterData])

          
       const handleBarClick = (event) => {
            const {index} = getElementsAtEvent(bar.current, event)[0];
        
            const clickedFeature = axis[index];
            updateLineChart(clickedFeature);
    
          };
          
        
          const updateLineChart = (feature) => {

            setLineData({
              labels: itemDates,
              datasets: [{
                label: `${feature} Time Trend`,
                data: timeTrend[feature],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                tension: 0.1
              }]  
            });

          };

          return (
            <div className='app_container'>
              
              <Filter 
              filterAge={ageFilter}
              filterGender={genderFilter}
              filterStartDate={startDate}
              filterEndDate={endDate}
              setAgeFilter={setAgeFilter}
              setGenderFilter={setGenderFilter}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              totalTime={totalTimeSpent}
              timeTrend={timeTrend}
              primaryData={primaryData}
              itemDates={itemDates}

              />
          
            <ChartBar 
            bar={bar} barData={barData} 
            lineData={lineData} handleBarClick={handleBarClick}
            />
      
            </div>
          );
        
        
};
                
    

