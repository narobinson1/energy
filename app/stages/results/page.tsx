'use client'

import { useContext, useState, useEffect } from "react";
import { EmailContext } from "@/app/stages/email/email.context"
import { EnergyContext } from "@/app/stages/energytotal/energy.context"
import { ApplianceContext } from "@/app/stages/appliances/appliance.context"
import { ResultCard } from '@/app/ui/results/result-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from 'next/link';
import clsx from "clsx";

export default function Home() {
  // const { email } = useContext(EmailContext)
  const email=localStorage.getItem("email")
  const { totalEnergy, energies } = useContext(EnergyContext)
  const { appliances } = useContext(ApplianceContext)
  const [load,setLoad]=useState(false)
  const appliancesOrder = []
  const appliances_test = Object.keys(energies)
  // {
  //   "Fridge": 1000,
  //   "Freezer": 2000,
  //   "Dishwasher": 500,
  // }
  var items = Object.keys(energies).map(function(key) {
    let rounded_energy = energies[key]
    let rounded_percentage = energies[key]/totalEnergy
    return [key, rounded_energy, rounded_percentage];
  });
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  items.map((item)=>{
    item.unshift(items.indexOf(item)+1)
  })
  useEffect(()=>{
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
        <Link href="/stages/energytotal">
          <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
        </Link>
        <p className="px-10 font-bold text-6xl text-zinc-700">Results</p>
      </div>
      <Link href="/">
        <div className="absolute top-10 right-10">
          <button onClick={()=>{
            localStorage.clear()
          }} 
          className="bg-zinc-100 text-zinc-700 px-10 py-6 font-bold text-4xl rounded-lg transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300">Restart <FontAwesomeIcon className="text-blue-500" icon={faRotateLeft} /></button>
        </div>
      </Link>
      <div className="relative top-10 left-10 w-1/2 my-8">
        <div className="my-4 py-4 px-4 grid grid-cols-4 gap-3 justify-center font-medium">
          <div className="mx-auto">No.</div>
          <div className="mx-auto">Appliance</div>
          <div className="mx-auto">Energy (kWh)</div>
          <div className="mx-auto">Relative to total</div>
        </div>
        {items.map((item) => (
            <ResultCard key={item[0]} ranking={item[0]} title={item[1]} energy={Math.round(item[2])} percentageEnergy={Math.round(item[3]*100)+"%"}/>
        ))}
      </div>
    </div>
  );
}