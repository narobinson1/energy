'use client'

import computeEnergyOfAppliances, { computeMinimumEnergy } from '@/app/lib/computeEnergyOfAppliances'

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from "next/link";
import { NavigationButton } from '@/app/ui/button';

const maximumDailyEnergyUsage = 75

export default function Step3() {
  const router = useRouter()
  const [totalEnergy, setTotalEnergy] = useState(0)
  const [appliances,setAppliances]=useState([''])
  const [validBoolean, setValidBoolean] = useState(true)
  const [load, setLoad]=useState(false)
  // const { appliances } = useContext(ApplianceContext)
  const minimumDailyEnergyUsage = computeMinimumEnergy(appliances)

  const onEnergyUsageChange = (e: any) => {
    console.log(e)
    setTotalEnergy(e.target.value)
    if (totalEnergy > 0 && totalEnergy < maximumDailyEnergyUsage) {
      setValidBoolean(true)
    }
  }
  
  const saveTotalEnergyInLocalStorage = ()=>{
    localStorage.setItem("totalEnergy",totalEnergy.toString())
  }

  const saveEnergiesInLocalStorage = (energies: any)=>{
    let energiesStringified=JSON.stringify(energies)
    localStorage.setItem("energies",energiesStringified)
  }

  const handleSubmitTotalEnergy=()=>{
    if (totalEnergy >= minimumDailyEnergyUsage && totalEnergy <= maximumDailyEnergyUsage) {
        saveTotalEnergyInLocalStorage()
        const applianceEnergies = computeEnergyOfAppliances(appliances, totalEnergy)
        saveEnergiesInLocalStorage(applianceEnergies)
        router.push('/stages/results')
    } else {
        setValidBoolean(false)
    }
  }
  useEffect(()=>{
    if (localStorage.getItem("totalEnergy")!=null){
      let storedTotalEnergy:any = localStorage.getItem("totalEnergy")
      setTotalEnergy(storedTotalEnergy)
    }
    const appliancesStringified:any = localStorage.getItem("appliances")
    const appliances=JSON.parse(appliancesStringified)
    setAppliances(appliances)
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
      <div className="absolute top-40 left-60">
        <Link href="/stages/appliances">
          <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
        </Link>
      </div>
      <div className="absolute top-64 left-60 text-2xl font-bold">
        <p>Enter the total daily energy consumed in your home (in kWh)</p>
      </div>
      <div className="absolute top-80 left-60 w-3/4 h-14">
        <input 
            className="border-2 border-zinc-300 w-3/4 h-14 rounded-2xl px-6" 
            type="text"
            value={totalEnergy}
            placeholder="Total energy in kWh"
            onChange={onEnergyUsageChange}
        >
        </input>
        <div className={clsx('pt-6 text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
          <p>Enter a value between {minimumDailyEnergyUsage} and {maximumDailyEnergyUsage}</p>
        </div>
      </div>
        <button 
          className="absolute bottom-52 left-60"
          onClick={()=>{
            handleSubmitTotalEnergy()
          }}
        >
          Proceed to results
        </button>
        <NavigationButton onSubmit={handleSubmitTotalEnergy} content="Proceed to results"/>
    </div>
  );
}