'use client';
import { getLanguage } from "@/lib/language";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext<any>([]);

export const LanguageProvider = ({children}:any) => {
    const [language, setLanguage] = useState<any>("");

    useEffect(() => {
        getLanguage().then(res => {
            console.log(res)
            setLanguage(res)
        })
    }, [])

    return(
        <GlobalContext.Provider value={{language, setLanguage}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useLanguageContext = () => useContext(GlobalContext);