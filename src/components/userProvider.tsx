/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { getUser } from "@/lib/user";
import axios from "axios";
// import { getLanguage } from "@/lib/language";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext<any>([]);

export const UserProvider = ({children}:any) => {
    const [user, setUser] = useState<any>("");

    useEffect(() => {
        // getUser().then(res => {
        //     setUser(res)
        // })

        axios.get('https://cf-helper-api.gethub.net/account').then((res) => {
            console.log(res)
        })
    }, [])

    return(
        <GlobalContext.Provider value={{user, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useUserContext = () => useContext(GlobalContext);