import React from 'react'
import DatePicker from 'react-datepicker';

const url = import.meta.env.VITE_API_URL;

function Filter(
    {filterAge, filterGender,
    filterStartDate, filterEndDate,
    setAgeFilter, setGenderFilter,
    setStartDate, setEndDate,
    totalTime, timeTrend, primaryData,itemDates
    }

    ) {

    const payload = {
        age: filterAge,
        gender: filterGender,
        startDate: filterStartDate,
        endDate: filterEndDate,
        totalTime: totalTime,
        timeTrend: timeTrend
    }

    function saveDetails(){
        fetch(`${url}/save`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(payload),
            credentials: 'include'
        
        }).then((res) => res.json())
        .then(data => alert(data))
        .catch(err => console.warn(err))
    }


    const serializeData = (data) => {
      if (typeof data === 'object') {
        const jsonData = JSON.stringify(data);
        return btoa(jsonData);
      }
        return data;
    };
    

    function generateURL(){
      const url = new URL(`${location.origin}/view`);

      const params = {
        age : filterAge,
        gender: filterGender,
        startdate: filterStartDate,
        enddate: filterEndDate,
        totaltime: totalTime,
        timetrend: timeTrend,
        itemDates : itemDates
      }

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value) || typeof value === "object") {
          const val = serializeData(value)
          url.searchParams.append(key, val);
        } else {
          url.searchParams.append(key, String(value));
        }
      });

      navigator.clipboard.writeText(url) // copy the url 
      alert('url is generated and copied');
    
    }



  return (
    <div className='flex mt-10 items-center flex-col md:flex-row justify-between'>
          <div className='m-auto md:m-0'>
            <h5 className='text-xl text-center mb-5'>Filter Section</h5>
          <div className="flex items-center gap-8 text-gray-800  mb-5 justify-center">
            <label >Age
                <select className="w-full" onChange={(e) => setAgeFilter(e.target.value)} value={primaryData?.age}>
                  <option value="15-25">15-25</option>
                  <option value="25">25+</option>
                </select>
              </label>

              <label>Gender
                <select className="w-full"  onChange={(e) => setGenderFilter(e.target.value)} value={primaryData?.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
          </div>

              <div className='flex items-center gap-5 justify-center'>
                <label className='flex flex-col'>Start Date:
                <DatePicker className="p-1 border border-gray-800 rounded-lg" selected={filterStartDate} onChange={(date) => setStartDate(date)} value={filterStartDate}/>
               </label> 
               <label className='flex flex-col'>End Date:
                <DatePicker className="p-1 border border-gray-800 rounded-lg" selected={filterEndDate} onChange={(date) => setEndDate(date)} value={filterEndDate} />
              </label>
              </div>
              </div>

              <div className="flex mt-8 items-center gap-20">
                <button onClick={saveDetails} className='btn border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'>Save</button>
                <button onClick={generateURL} className='flex items-center gap-2 btn bg-gray-900 text-white hover:bg-gray-800'>Share 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                </button>
              </div>
    </div>
  )
}

export default Filter;