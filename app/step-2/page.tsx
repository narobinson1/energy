'use client'

import { useState, useContext } from 'react';
import { ApplianceContext } from '@/app/step-2/appliance.context';
import { ApplianceCard } from '@/app/ui/step-2/appliance-card';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from "next/link";

const appliances = [
    "Fridge",
    "Freezer",
    "Washing machine",
    "Dishwasher",
    "Induction stove",
    "TV",
    "Small Light",
    "Big Light",
]

export default function Step2() {
  const router = useRouter()
  const [selectedAppliances, setSelectedAppliances] = useState([""])
  const [validBoolean, setValidBoolean] = useState(true)
  const { saveAppliances } = useContext(ApplianceContext)

  const handleToggleAppliance = (appliance: string) => {
    const index = selectedAppliances.indexOf(appliance)
    if (index == -1) {
      setSelectedAppliances([...selectedAppliances, appliance])
      setValidBoolean(true)
    } else {
      setSelectedAppliances(selectedAppliances.filter((app) => app !== appliance))
    }
  }

  const handleSubmitAppliances=(selectedAppliances: string | any[])=>{
    if (selectedAppliances.length <= 1 ) {
      setValidBoolean(false)
    } else {
      saveAppliances(selectedAppliances)
      router.push('step-3')
    }
  }

  return (
    <div className="static">
      <div className="absolute top-40 left-60">
        <Link href="/step-1">
          <p>Arrow</p>
        </Link>
      </div>
      <div className="absolute top-64 left-60">
        <p>Select all your user appliances from among the following list</p>
      </div>
      <div className="absolute top-80 left-60">
        <div className="static w-3/4">
            {appliances.map((appliance) => (
                <ApplianceCard key={appliance} title={appliance} toggleAppliance={handleToggleAppliance} />
            ))}
        </div>
        <div className={clsx('text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
          <p>Please select some appliances</p>
        </div>
      </div>
        <button 
          className="absolute bottom-72 left-60"
          onClick={()=>{
            handleSubmitAppliances(selectedAppliances)
          }}
        >
          Next
        </button>
    </div>
  );
}
