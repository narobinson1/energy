'use client'

import { useState, useContext, useEffect, SetStateAction } from "react";
import { useRouter } from 'next/navigation'
import clsx from 'clsx';
import Link from "next/link";
import { NavigationButton } from "@/app/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function EmailPage() {
  const [email, setEmail] = useState("")
  const [load, setLoad] = useState(false)
  const [validBoolean, setValidBoolean] = useState(true)
  const router = useRouter()

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value)
  }

  const saveEmailInLocalStorage = (email: any)=>{
    localStorage.setItem("email",email)
  }
  
  const handleEmailSubmit = () => {
    if (validateEmail(email) == true) {
      saveEmailInLocalStorage(email)
      router.push('/stages/appliances')
    } else {
      setValidBoolean(false)
    }
  }

  function validateEmail(email: string) {
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
    // <div className={clsx(
    //   'static',
    //   {
    //     'transition-opacity ease-in duration-1000 opacity-100': load == true,
    //     'opacity-0': load==false,
    //   }
    // )}>
    <div className="flex flex-row h-screen w-full">
        <div className="basis-128 lg:basis-auto flex flex-col h-128 mx-auto mt-32 md:w-1/2 p-10">
          <Link className="flex-1 self-start" href="/">
            <FontAwesomeIcon className="fa-2xl text-blue-500 transition ease-in-out delay-50 hover:-translate-x-4 duration-300" icon={faArrowLeft} />
          </Link>
          <p className="flex-1 self-start text-2xl font-bold">Enter your email address</p>
          <input 
          className="border-2 border-zinc-300 w-full h-14 rounded-2xl px-6" 
          type="text"
          value={email}
          placeholder="Email address"
          onChange={handleEmailChange}
          >

          </input>
          <p className={clsx('flex-1 self-start pt-6 text-red-300',
          {
            'invisible': validBoolean === true,
            'visible': validBoolean === false,
          })}>
            Email not valid
          </p>
          <NavigationButton className="flex flex-row w-full justify-center" onSubmit={handleEmailSubmit} content="Next"/>
        </div>
    </div>
    // </div>
  );
}
