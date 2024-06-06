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

export default function AppliancesPage() {
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
    // <div className={clsx(
    //   'static',
    //   {
    //     'transition-opacity ease-in duration-1000 opacity-100': load == true,
    //     'opacity-0': load==false,
    //   }
    // )}>
    <div className="flex flex-row h-screen w-full">
        <div className="basis-128 lg:basis-auto flex flex-col h-[38rem] lg:h-[38rem] mx-auto mt-32 md:w-1/2 p-10">
          <Link className="flex-1 self-start" href="/stages/email">
            <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
          </Link>
          <p className="flex-1 self-start text-2xl font-bold">Select all your user appliances</p>
          <div className="flex flex-row flex-wrap">
            {appliances.map((appliance) => (
              <ApplianceCard key={appliance} title={appliance} toggleAppliance={handleToggleAppliance} selectedAppliances={selectedAppliances} />
            ))}
          </div>
          <p className={clsx('flex-1 self-start text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
            Please select some appliances
          </p>
          <NavigationButton className="flex flex-row w-full justify-center" onSubmit={handleSubmitAppliances} content="Next"/>
        </div>
    </div>
    // </div>
  );
}
