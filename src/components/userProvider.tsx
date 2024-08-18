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

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '03ec91dc-c802-46b1-9cb1-4df06e40cb36'
            }
        };

        axios.get('https://cf-helper-api.gethub.net/account', config).then((res) => {
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