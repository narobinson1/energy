'use client'

import computeEnergyOfAppliances, { computeMinimumEnergy } from '@/app/lib/compute-energy'

import { useState, useContext, useEffect, useSyncExternalStore, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { NavigationButton } from '@/app/ui/button';
import { parseLocalStorage } from '@/app/utils/parseLocalStorage'

const maximumDailyEnergyUsage = 75

export default function EnergyTotalPage() {
  const router = useRouter()
  const [totalEnergy, setTotalEnergy] = useState(0)
  const [appliances,setAppliances]=useState([''])
  const [validBoolean, setValidBoolean] = useState(true)
  const [load, setLoad]=useState(false)
  const [minimumDailyEnergyUsage, setMinimumDailyEnergyUsage]=useState(0)

  const onEnergyUsageChange = (e: any) => {
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
        saveEnergiesInLocalStorage(computeEnergyOfAppliances(appliances, totalEnergy))
        router.push('/stages/results')
    } else {
        setValidBoolean(false)
    }
  }
  useEffect(()=>{
    if (localStorage.getItem("totalEnergy")!=null){
      let storedTotalEnergy: SetStateAction<number> = Number(localStorage.getItem("totalEnergy")) || -1
      setTotalEnergy(storedTotalEnergy)
    }
    setAppliances(parseLocalStorage(localStorage, "appliances"))
    setMinimumDailyEnergyUsage(computeMinimumEnergy(appliances))
    setLoad(true)
  }, [])
  return (
    // <div className={clsx(
    //   'static',
    //   {
    //     'transition-opacity ease-in duration-1000 opacity-100': load == true,
    //     'opacity-0': load==false,
    //   }
    // )}>
    <div className="flex flex-row h-screen w-full">
      <div className="basis-128 lg:basis-auto flex flex-col h-128 mx-auto mt-32 md:w-1/2 p-10">
        <Link className="flex-1 self-start" href="/stages/appliances">
          <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
        </Link>
        <p className='flex-1 self-start text-2xl font-bold'>Enter the total daily energy consumed in your home (in kWh)</p>
        <input 
            className="border-2 border-zinc-300 w-full h-14 rounded-2xl px-6" 
            type="text"
            value={totalEnergy != 0 ? totalEnergy : ''}
            placeholder="Total energy in kWh"
            onChange={onEnergyUsageChange}
        >
        </input>
        <p className={clsx('flex-1 self-start pt-6 text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
          Enter a value between {minimumDailyEnergyUsage} and {maximumDailyEnergyUsage}
        </p>
        <NavigationButton className="flex flex-row w-full justify-center" onSubmit={handleSubmitTotalEnergy} content="Proceed to results"/>
      </div>
    </div>
    // </div>
  );
}