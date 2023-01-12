import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({arr=[],currency,days}) => {
    
    const prices =  arr.map((currentArray)=>{
        return (currentArray[1]);
 }) ;
 const date = arr.map((currentArray)=>{
    if(days==='24h') {
        return (  new Date ( currentArray[0]).toLocaleTimeString());
    }
    else return (  new Date ( currentArray[0]).toLocaleDateString());
    }) ;
    const data = {
        labels:date,
        datasets: [
            {
                label: `Price in ${currency}`,
                data: prices,
                borderColor:"rgb(255,99,132)",
                backgroudColor:"rgba(255,99,132,0.5)",

            }
        ]
    }
  return (
    <Line
    options={{
        responsive:true
    }}
    data={data}

    />
  );
}

export default Chart
