'use client'

import { useEffect, useState } from 'react';
import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from 'next/link';
import { NavigationButton } from './ui/button';
import { useRouter } from 'next/navigation';
import clsx from 'clsx'

export default function Home() {
  const router = useRouter()
  const handleButtonClick = () => {
    router.push('/stages/email')
  }
  const [load, setLoad]=useState(false)
  useEffect(()=>{
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
        <p className="font-bold text-5xl">Welcome</p>
      </div>
      <div className="absolute top-80 left-60">
        <p className="text-3xl w-4/5">Follow a few simple steps to get the energy usage of each of your appliances.</p>
      </div>
        <NavigationButton onSubmit={handleButtonClick} content="Get started"/>
    </div>
  );
}
