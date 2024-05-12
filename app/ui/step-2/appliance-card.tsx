'use client'

import { useState } from 'react';

import clsx from 'clsx';

export function ApplianceCard({
    title,
    toggleAppliance
  }: {
    title: string;
    toggleAppliance: any;
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
    return (
      <div className="inline-block pr-8 pb-4">
        <button 
          className={clsx(
            'border-2 px-6 py-4',
            {
              'border-zinc-300': toggled == false,
              'border-blue-300': toggled == true,
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