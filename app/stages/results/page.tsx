'use client'

import { useContext, useState, useEffect } from "react";
import { ResultCard } from '@/app/ui/results/result-card';
import { InfoCard } from '@/app/ui/results/info-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from 'next/link';
import clsx from "clsx";

export default function Home() {
  // const { email } = useContext(EmailContext)
  const [email,setEmail]=useState('')
  const [appliances,setAppliances]=useState([''])
  const [totalEnergy,setTotalEnergy]=useState('')
  const [energies,setEnergies]=useState('')
  const [items,setItems]=useState([['']])
  const [load,setLoad]=useState(false)
  const appliancesOrder = []
  const appliances_test = Object.keys(energies)
  // {
  //   "Fridge": 1000,
  //   "Freezer": 2000,
  //   "Dishwasher": 500,
  // }
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
    <div className={clsx(
      'static',
      {
        'transition-opacity ease-in duration-1000 opacity-100': load == true,
        'opacity-0': load==false,
      }
    )}>
      <div className="relative top-12 left-10 w-80">
        <div className="py-2 px-4 grid grid-cols-4 gap-3 justify-center font-medium">
          <Link className="my-auto" href="/stages/energytotal">
            <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
          </Link>
          <p className="my-auto font-bold text-2xl text-zinc-700">Results</p>
        </div>
      </div>
      <Link href="/">
        <div className="absolute top-10 right-10">
          <button onClick={()=>{
            localStorage.clear()
          }} 
          className="bg-blue-500 text-white px-8 py-2 font-semibold text-2xl rounded-lg transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300">Restart <FontAwesomeIcon className="text-white" icon={faRotateLeft} /></button>
        </div>
      </Link>
      <div className="relative top-14">
        <div className="grid grid-cols-3">
          <div className="col-span-2 mx-auto left-10 w-4/5 my-6">
            <div className="my-4 py-4 px-4 grid grid-cols-4 gap-3 justify-center font-medium">
              <div className="mx-auto">No.</div>
              <div className="mx-auto">Appliance</div>
              <div className="mx-auto">Energy (kWh)</div>
              <div className="mx-auto">Relative to total</div>
            </div>
            {items.map((item) => {

              return (
                <ResultCard key={item[0]} ranking={Number(item[0])} title={item[1]} energy={Math.round(Number(item[2]))} percentageEnergy={Math.round(Number(item[3])*100)+"%"}/>
            )
            })}
          </div>
          <InfoCard email={email} appliances={appliances} totalEnergy={totalEnergy}/>
        </div>
      </div>
    </div>
  );
}