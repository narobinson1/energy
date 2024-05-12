'use client'

import { useContext, useState } from "react";
import { EmailContext } from "@/app/step-1/email.context"
import { EnergyContext } from "@/app/step-3/energy.context"
import { ResultCard } from '@/app/ui/results/result-card';

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const { email } = useContext(EmailContext)
  const { totalEnergy } = useContext(EnergyContext)
  return (
    <div className="static">
      <div className="absolute top-10 left-1/2">
        <p>Results for {email} {totalEnergy}</p>
      </div>
      <Link href="/">
        <div className="absolute top-10 right-40">
          <button>Restart</button>
        </div>
      </Link>
      <div className="mx-auto absolute w-1/2 bg-zinc-300">
        <ResultCard title="Fridge" />
      </div>
      <Link href="/step-1">
        <button className="absolute bottom-72 left-60">Get started</button>
      </Link>
    </div>
  );
}