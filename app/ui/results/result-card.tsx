import clsx from 'clsx';
import { useState, useEffect } from 'react';

export function ResultCard({
    ranking,
    title,
    energy,
    percentageEnergy
  }: {
    ranking: number;
    title: string;
    energy: number;
    percentageEnergy: string;
  }) {
    const [load,setLoad]=useState(false)
    useEffect(()=>{
      setTimeout(()=>{
        setLoad(true)
      }, ranking*200)
    },[])
    return (
      <div className='transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300'>
        <div className={clsx(
        'my-4 py-4 px-4 bg-zinc-100 grid grid-cols-4 gap-3 justify-center rounded-lg font-semibold',
        {
          'transition-opacity ease-in duration-1000 opacity-100': load == true,
          'opacity-0': load==false,
        }
      )}>
          <div className="mx-auto">{ranking}</div>
          <div className="mx-auto">{title}</div>
          <div className="mx-auto">{energy}</div>
          <div className="mx-auto">{percentageEnergy}</div>
        </div>
      </div>
    );
  }