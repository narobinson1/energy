'use client'

import { useState, useContext, SetStateAction } from "react";
import { useRouter } from 'next/navigation'
import { EmailContext } from '@/app/step-1/email.context'
import clsx from 'clsx';

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from "next/link";

export default function Step1() {
  const [email, setEmail] = useState("")
  const [validBoolean, setValidBoolean] = useState(true)
  const { saveEmail } = useContext(EmailContext);
  const router = useRouter()

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handleEmailSubmit = (email: string) => {
    if (email !== "") {
      saveEmail(email)
      router.push('step-2')
    } else {
      setValidBoolean(false)
    }
  }

  return (
    <div className="static">
      <div className="absolute top-40 left-60">
        <Link href="/">
          <p>Arrow</p>
        </Link>
      </div>
      <div className="absolute top-64 left-60">
        <p>Enter your email address</p>
      </div>
      <div className="absolute top-80 left-60 w-3/4 h-14">
        <input 
          className="border-2 border-zinc-300 w-3/4 h-14" 
          type="text"
          value={email}
          onChange={handleEmailChange}
        >

        </input>
        <div className={clsx('pt-6 text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
          <p>Email not valid</p>
        </div>
      </div>
        <button 
          className="absolute bottom-72 left-60"
          onClick={()=>{
            handleEmailSubmit(email)
          }}
        >
          Next
        </button>
    </div>
  );
}
