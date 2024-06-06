'use client'

import { useState, useEffect } from 'react';

import clsx from 'clsx';

export function ApplianceCard({
    title,
    toggleAppliance,
    selectedAppliances,
  }: {
    title: string;
    toggleAppliance: any;
    selectedAppliances:any;
  }) {
  
    const [toggled, setToggled] = useState(false)
    const changeColour = (e: any) => {
      if (toggled !== true) {
        toggleAppliance(e.target.value)
        setToggled(true)
      } else {
        toggleAppliance(e.target.value)
        setToggled(false)
      }
    }
    useEffect(()=>{
      if (selectedAppliances.indexOf(title)!=-1){
        setToggled(true)
      }
    }, [selectedAppliances])
    return (
      <div className="inline-block pr-8 pb-6">
        <button 
          className={clsx(
            'border px-4 py-2 text-lg rounded-lg',
            {
              'border-zinc-300 transition-colors ease-in duration-200': toggled == false,
              'bg-blue-100 transition-colors ease-in duration-200': toggled == true,
            },
          )}
          value={title}
          onClick={changeColour}
        >
          {title}
        </button>
      </div>
    );
  }