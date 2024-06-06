import { PieChart } from '@mui/x-charts/PieChart'
import { useEffect, useState } from 'react'

export default function BasicPie({
    items,
}: {
    items: any
}){
    // [1, "Fridge", 800, 0.1] => { id: 1, value=0.1*100, label="Fridge"}
    // const [pieData, setPieData] = useState([['']])
    // useEffect(()=>{
    //     const pie_data: any = []
    //     items.map((item: any)=>{
    //         let record = {id: Number(item[0]), value: Number(item[3]*100), label: item[1]}
    //         pie_data.concat(record)
    //     }),
    //     setPieData(pie_data)
    // }, items)
    const pie_data: any = []
        items.map((item: any)=>{
            let record = {id: Number(item[0]), value: Math.round(Number(item[3]*100)), label: item[1]}
            pie_data.push(record)
        }),
    console.log(items)
    return (
        <PieChart 
            series={[
                {
                    data: pie_data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                }
            ]}
            margin={{
                left: 0,
                right: 160,
                top: 60,
                bottom: 0,
            }}
            slotProps={{
                legend: {
                    direction: 'column',
                    position: {
                      vertical: 'middle',
                      horizontal: 'right',
                    },
                    itemMarkWidth: 20,
                    itemMarkHeight: 2,
                    markGap: 5,
                    itemGap: 10,
                    labelStyle: {
                        fontSize: 10,
                      },
                  }
            }}
        />
    )
}