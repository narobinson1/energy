'use client'

import { useContext, useState, useEffect, useSyncExternalStore } from "react";
import { ResultCard } from '@/app/ui/results/result-card';
import { InfoCard } from '@/app/ui/results/info-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link';
import clsx from "clsx";
import BasicPie from "@/app/ui/results/basic-pie";

export default function ResultsPage() {
  const [email,setEmail]=useState('')
  const [appliances,setAppliances]=useState([''])
  const [totalEnergy,setTotalEnergy]=useState('')
  const [energies,setEnergies]=useState('')
  const [items,setItems]=useState([['']])
  const [load,setLoad]=useState(false)

  useEffect(()=>{
    const email=localStorage.getItem("email") || ''
    setEmail(email)
    const appliancesStringified:any=localStorage.getItem("appliances") || ''
    const appliances=JSON.parse(appliancesStringified)
    setAppliances(appliances)
    const totalEnergy=localStorage.getItem("totalEnergy") || ''
    setTotalEnergy(totalEnergy)
    const energiesStringified:any=localStorage.getItem("energies") || ''
    const energies =JSON.parse(energiesStringified)
    setEnergies(energies)
    var items = Object.keys(energies).map(function(key) {
      let rounded_energy = energies[key]
      let rounded_percentage = energies[key]/Number(totalEnergy)
      return [key, rounded_energy, rounded_percentage];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    items.map((item)=>{
      item.unshift(items.indexOf(item)+1)
    })
    setItems(items)
    setLoad(true)
  }, [])
  return (
    <div className="flex flex-row h-screen w-full">
        <div className="basis-128 lg:basis-auto flex flex-col h-128 mx-auto mt-32 md:w-1/2 p-10">
          <Link className="flex-1 self-start" href="/stages/energytotal">
            <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
          </Link>
          <p className="flex-1 font-bold text-2xl mt-10">Results</p>
          {/* <Link href="/">
            <div className="absolute top-10 right-10">
              <button onClick={()=>{
                localStorage.clear()
              }} 
              className="bg-blue-500 text-white px-8 py-2 font-semibold text-2xl rounded-lg transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300">Restart <FontAwesomeIcon className="text-white" icon={faRotateLeft} /></button>
            </div>
          </Link> */}
            {/* <div className="self-start flex-1 w-full flex-row mb-10">
              <div className="inline-block mx-auto text-sm">No. | </div>
              <div className="inline-block mx-auto text-sm">Appliance |</div>
              <div className="inline-block mx-auto text-sm">Energy (kWh) |</div>
              <div className="inline-block mx-auto text-sm">Relative to total</div>
              {items.map((item) => {

return (
  <ResultCard key={item[0]} ranking={Number(item[0])} title={item[1]} energy={Math.round(Number(item[2])) == 0 ? 1 : Math.round(Number(item[2]))} percentageEnergy={Math.round(Number(item[3])*100)+"%"}/>
)
})}
            </div> */}
          <BasicPie items={items}/>
        </div>
    </div>
    // <div className={clsx(
    //   'static',
    //   {
    //     'transition-opacity ease-in duration-1000 opacity-100': load == true,
    //     'opacity-0': load==false,
    //   }
    // )}>
    // </div>
  );
}