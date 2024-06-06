'use client'

import { useEffect, useState } from 'react';
import { NavigationButton } from './ui/button';
import { useRouter } from 'next/navigation';
import clsx from 'clsx'

export default function HomePage() {
  const router = useRouter()
  const handleButtonClick = () => {
    router.push('/stages/email')
  }
  const [load, setLoad]=useState(false)
  useEffect(()=>{
    setLoad(true)
  }, [])
  return (
    // <div className={clsx(
    //   '',
    //   {
    //     'transition-opacity ease-in duration-1000 opacity-100': load == true,
    //     'opacity-0': load==false,
    //   }
    // )}>
    <div className="flex flex-row h-screen w-full">
        <div className="basis-128 lg:basis-auto flex flex-col h-128 mx-auto mt-32 md:w-1/2 p-10">
            <p className="flex-1 self-start font-bold text-5xl">Welcome</p>
            <p className="flex-1 text-2xl">Follow a few simple steps to get the energy usage of each of your appliances.</p>
            <NavigationButton className="flex flex-row w-full justify-center" onSubmit={handleButtonClick} content="Get started"/>
        </div>
    </div>
    // </div>
  );
}
