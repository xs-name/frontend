'use client';

import { Proportions, Users, Globe, Settings, Phone, Lock, SquareChartGantt, User, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import { useLanguageContext } from "./LanguageProvider";
import axios from 'axios';
import Link from "next/link";
import { Loading } from "./Loading.components";
import { usePathname } from "next/navigation";
import { getLanguage } from "@/lib/language";

export const Sitebar = ({active, setActive}: any) => {
    const {language, setLanguage} = useLanguageContext()
    const [lang, setLang] = useState<any>();
    const [loading, setLoading] = useState(true)

    const [sitebar, setSitebar] = useState<any>([])
    const [sitebarcontact, setSitebarcontact] = useState<any>([])
    const pathname = usePathname()


    useEffect(() => {
        if(language){
            axios.get(`/lang/${language}.json`).then((res:any) => {
                setLang(res.data.sitebar)
                if(pathname.slice(0, 10) == "/websites/"){
                    setSitebar([
                        {name: res.data.sitebar.dns, link: pathname.slice(0, -3) + "dns", icon: <SquareChartGantt />},
                        {name: res.data.sitebar.ssl, link: pathname.slice(0, -3) + "ssl", icon: <Lock />}
                    ])
                } else if(pathname.slice(0, 10) == "/account" || pathname.slice(0, 10) == "/billing"){
                    setSitebar([
                        {name: res.data.sitebar.account, link: "/account", icon: <User />},
                        {name: res.data.sitebar.billing, link: "/billing", icon: <Wallet />}
                    ])
                } else {
                    setSitebar([
                        {name: res.data.sitebar.websites, link: "/websites", icon: <Proportions />},
                        {name: res.data.sitebar.accounts, link: "/accounts", icon: <Users />},
                        // {name: res.data.sitebar.domain, link: "/domain", icon: <Globe />}
                    ])
                }
                
                setSitebarcontact([
                    {name: res.data.sitebar.settings, link: "/settings", icon: <Settings />},
                    {name: res.data.sitebar.support, link: "https://t.me/cfhelp_support", icon: <Phone />}
                ])
            }).finally(() => {
                setLoading(false)
            });
        }
    }, [language])

    useEffect(() => {
    getLanguage().then(res => {
        setLanguage(res)
    })
    }, [])


    if(loading){
        return <Loading />
    }

    return(
        <div className={active? "fixed top-0 left-0 w-full h-full bg-gray-950/20 z-20 pointer-events-auto" : "fixed top-0 left-0 w-full h-full bg-gray-950/0 z-20 pointer-events-none"} onClick={() => setActive(!active)}>
            <div onClick={(e) => e.stopPropagation()} className={active? "fixed top-0 h-dvh bg-background w-[260px] max-md:translate-x-[0] transition-all pt-16 border-r pointer-events-auto" : "fixed top-0 h-dvh bg-background w-[260px] max-md:translate-x-[-100%] transition-all pt-16 border-r pointer-events-auto"}>
                <div className="border-b flex h-14 items-center pl-4 pr-4 justify-between">
                    <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium">{lang?.plan}</p>
                    <Badge>{lang?.enterprise}</Badge>
                </div>
                <div className="border-b flex flex-col gap-1 items-center pl-4 justify-between pt-5 pb-5">
                    {sitebar.map((item: any) => 
                        <Link key={item.link} href={item.link} className={pathname == item.link ? `flex gap-4 border-primary/40 rounded-l-full border-l border-t border-b bg-primary/10 items-center w-full pt-2 pb-2 text-primary pl-5` : `flex gap-4 rounded-l-full hover:bg-primary/10 items-center w-full pt-2 pb-2 text-primary pl-5`} >
                            {item.icon}
                            <p className="leading-7 font-medium">{item.name}</p>
                        </Link>
                    )}
                </div>
                <div className="border-b flex flex-col gap-1 items-center pl-4 justify-between pt-5 pb-5">
                    {sitebarcontact.map((item: any) => 
                        <Link key={item.link} href={item.link} className={pathname == item.link ? `flex gap-4 border-primary/40 rounded-l-full border-l border-t border-b bg-primary/10 items-center w-full pt-2 pb-2 text-primary pl-5` : `flex gap-4 rounded-l-full hover:bg-primary/10 items-center w-full pt-2 pb-2 text-primary pl-5`} >
                            {item.icon}
                            <p className="leading-7 font-medium">{item.name}</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}