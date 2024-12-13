import { Bar, Line } from "react-chartjs-2";

export default function ChartBar({bar=undefined, barData, lineData, handleBarClick = undefined}){



        // bar chart options...
        const options = {
            indexAxis: 'y',
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'first One week dataset',
              },
            },
          };
          

    return(
        <div className="mb-20 flex items-center gap-10 lg:gap-5 justify-center lg:justify-start mt-24 flex-col lg:flex-row">
             {/* Bar Chart */}
            <div className=" w-full max-w-[600px] h-[300px]">
                <Bar data={barData} ref={bar} datasetIdKey='id'
                onClick={handleBarClick} 
                options={options} />
              </div>
        
              {/* Line Chart */}
              <div className="w-full max-w-[600px] h-[300px]">
                <Line data={lineData} options={
                  {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'first one week of treanding time ',
                      },
                    },
                  }
                } />
              </div>
        </div>
    )
}