'use client'

import { createContext, useState, useContext, SetStateAction } from "react";

export const EmailContext = createContext();

export const EmailContextProvider = ({children}) => {
    const [email, setEmail] = useState("");

    const saveEmail = (value) => {
        if (value !== "") {
            setEmail(value)
            console.log(value)
        } else {

        }
    }

    return (
        <EmailContext.Provider
            value={{
                email,
                saveEmail,
            }}
        >
            {children}
        </EmailContext.Provider>
    );
}