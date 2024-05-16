import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { ApplianceCard } from '@/app/ui/results/appliance-card'
export function InfoCard({
    email,
    appliances,
    totalEnergy,
  }: {
    email: string;
    appliances: string[];
    totalEnergy: string;
  }) {
    const [load,setLoad]=useState(false)
    const numberOfAppliances = appliances.length
    useEffect(()=>{
      setTimeout(()=>{
        setLoad(true)
      }, numberOfAppliances*2000)
    },[])
    return (
        <div className={clsx(
        'bg-zinc-100 inline-block w-4/5 my-28 rounded-lg',
        {
          'transition-opacity ease-in duration-1000 opacity-100': load == true,
          'opacity-0': load==false,
        }
      )}>
          <div className="p-10 mb-2">
                <p className="font-bold">Email:</p>
                <p>{email}</p>
                <p className="mt-10 font-bold">Appliances:</p>
                <p className="mb-10 mt-6">
                  {appliances.map((app)=>{
                    if (app!="") {
                      return (
                        <ApplianceCard key={app} title={app}/>
                      )
                    }
                  })}
                </p>
                <p className="font-bold">Total energy (in kWh):</p>
                <p>{totalEnergy}</p>
              </div>
        </div>
    );
  }