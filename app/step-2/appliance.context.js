'use client'

import { createContext, useState, useContext, SetStateAction } from "react";

export const ApplianceContext = createContext();

export const ApplianceContextProvider = ({children}) => {
    const [appliances, setAppliances] = useState([]);

    const saveAppliances = (value) => {
        if (value !== null) {
            setAppliances(value)
            console.log(value)
        }
    }

    return (
        <ApplianceContext.Provider
            value={{
                appliances,
                saveAppliances,
            }}
        >
            {children}
        </ApplianceContext.Provider>
    );
}