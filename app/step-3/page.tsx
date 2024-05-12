'use client'

import computeEnergyOfAppliances from '@/app/lib/computeEnergyOfAppliances'

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { EnergyContext } from '@/app/step-3/energy.context'
import { ApplianceContext } from '@/app/step-2/appliance.context'
import clsx from 'clsx';

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from "next/link";

const maximumDailyEnergyUsage = 75

export default function Step3() {
  const router = useRouter()
  const [totalEnergy, setTotalEnergy] = useState(0)
  const [validBoolean, setValidBoolean] = useState(true)
  const { saveTotalEnergy } = useContext(EnergyContext)
  const { appliances } = useContext(ApplianceContext)

  const onEnergyUsageChange = (e: any) => {
    console.log(e)
    setTotalEnergy(e.target.value)
    if (totalEnergy > 0 && totalEnergy < maximumDailyEnergyUsage) {
      setValidBoolean(true)
    }
  }

  const handleSubmitTotalEnergy=(totalEnergy: number)=>{
    if (totalEnergy > 0 && totalEnergy < maximumDailyEnergyUsage) {
        saveTotalEnergy(totalEnergy)
        computeEnergyOfAppliances(appliances, totalEnergy)
        router.push('/results')
    } else {
        setValidBoolean(false)
    }
  }

  return (
    <div className="static">
      <div className="absolute top-40 left-60">
        <Link href="/step-2">
          <p>Arrow</p>
        </Link>
      </div>
      <div className="absolute top-64 left-60">
        <p>Enter the total daily energy consumed in your home (in kWh)</p>
      </div>
      <div className="absolute top-80 left-60 w-3/4 h-14">
        <input 
            className="border-2 border-zinc-300 w-3/4 h-14" 
            type="text"
            onChange={onEnergyUsageChange}
        >
        </input>
        <div className={clsx('text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
          <p>Enter a value between 0 and 75</p>
        </div>
      </div>
        <button 
          className="absolute bottom-72 left-60"
          onClick={()=>{
            handleSubmitTotalEnergy(totalEnergy)
          }}
        >
          Proceed to results
        </button>
    </div>
  );
}