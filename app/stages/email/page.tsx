'use client'

import { useState, useContext, useEffect, useRef, SetStateAction } from "react";
import { useRouter } from 'next/navigation'
import { EmailContext } from '@/app/stages/email/email.context'
import clsx from 'clsx';

import styles from '@/app/landing.module.css'
import Image from "next/image";
import Link from "next/link";
import { NavigationButton } from "@/app/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function Step1() {
  const [email, setEmail] = useState("")
  let emailInput = useRef(email)
  const [load, setLoad] = useState(false)
  const [validBoolean, setValidBoolean] = useState(true)
  const { saveEmail } = useContext(EmailContext);
  const router = useRouter()

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handleEmailSubmit = () => {
    if (validateEmail(email) == true) {
      saveEmail(email)
      localStorage.setItem("email",email)
      router.push('/stages/appliances')
    } else {
      setValidBoolean(false)
    }
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  useEffect(()=>{
    if (localStorage.getItem("email")!=null){
      let storedEmail:any = localStorage.getItem("email")
      setEmail(storedEmail)
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
        <Link href="/">
          <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
        </Link>
      </div>
      <div className="absolute top-64 left-60 text-2xl font-bold">
        <p>Enter your email address</p>
      </div>
      <div className="absolute top-80 left-60 w-3/4 h-14">
        <input 
          className="border-2 border-zinc-300 w-3/4 h-14 rounded-2xl px-6" 
          type="text"
          value={email}
          placeholder="Email address"
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
        <NavigationButton onSubmit={handleEmailSubmit} content="Next"/>
    </div>
  );
}
