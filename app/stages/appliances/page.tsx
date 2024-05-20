'use client'

import { useState, useContext, useEffect } from 'react';
import { ApplianceCard } from '@/app/ui/appliances/appliance-card';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { NavigationButton } from '@/app/ui/button';

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
  const [load, setLoad]=useState(false)

  const handleToggleAppliance = (appliance: string) => {
    const index = selectedAppliances.indexOf(appliance)
    if (index == -1) {
      setSelectedAppliances([...selectedAppliances, appliance])
      setValidBoolean(true)
    } else {
      setSelectedAppliances(selectedAppliances.filter((app) => app !== appliance))
    }
  }
  
  const saveAppliancesInLocalStorage = (selectedAppliances: any)=>{
    let appliancesStringified=JSON.stringify(selectedAppliances)
    localStorage.setItem("appliances",appliancesStringified)
  }

  const handleSubmitAppliances=()=>{
    if (selectedAppliances.length <= 1 ) {
      setValidBoolean(false)
    } else {
      saveAppliancesInLocalStorage(selectedAppliances)
      router.push('/stages/energytotal')
    }
  }
  useEffect(()=>{
    if (localStorage.getItem("appliances")!=null){
      let appliancesStringified:any = localStorage.getItem("appliances")
      let storedAppliances = JSON.parse(appliancesStringified)
      setSelectedAppliances(storedAppliances)
      setValidBoolean(true)
    }
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
        <Link href="/stages/email">
          <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
        </Link>
      </div>
      <div className="absolute top-64 left-60 text-2xl font-bold">
        <p>Select all your user appliances from among the following list</p>
      </div>
      <div className="absolute top-80 left-60 font-medium">
        <div className="static w-3/4">
            {appliances.map((appliance) => (
                <ApplianceCard key={appliance} title={appliance} toggleAppliance={handleToggleAppliance} selectedAppliances={selectedAppliances} />
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
          className="absolute bottom-52 left-60"
          onClick={()=>{
            handleSubmitAppliances()
          }}
        >
          Next
        </button>
        <NavigationButton onSubmit={handleSubmitAppliances} content="Next"/>
    </div>
  );
}
