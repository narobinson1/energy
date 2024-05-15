'use client'

import { createContext, useState, useContext, SetStateAction } from "react";

export const EnergyContext = createContext();

export const EnergyContextProvider = ({children}) => {
    const [totalEnergy, setTotalEnergy] = useState(0)
    const [energies, setEnergies] = useState([]);

    const saveTotalEnergy=(totalEnergy)=>{
        setTotalEnergy(totalEnergy)
    }

    const saveEnergies = (value) => {
        if (value !== null) {
            setEnergies(value)
            console.log(value)
        }
    }

    return (
        <EnergyContext.Provider
            value={{
                totalEnergy,
                energies,
                saveTotalEnergy,
                saveEnergies,
            }}
        >
            {children}
        </EnergyContext.Provider>
    );
}