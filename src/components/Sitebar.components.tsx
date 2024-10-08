'use client';

import { Proportions, Users, Globe, Settings, Phone, Lock, SquareChartGantt, User, Wallet, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import { useLanguageContext } from "./LanguageProvider";
import axios from 'axios';
import Link from "next/link";
import { Loading } from "./Loading.components";
import { usePathname } from "next/navigation";
import { getLanguage } from "@/lib/language";
import { useUserContext } from "./userProvider";

export const Sitebar = ({active, setActive}: any) => {
    const {user, setUser} = useUserContext();
    const {language, setLanguage} = useLanguageContext()
    const [lang, setLang] = useState<any>();
    const [loading, setLoading] = useState(true)

    const [sitebar, setSitebar] = useState<any>([])
    const [sitebarcontact, setSitebarcontact] = useState<any>([])
    const pathname = usePathname()

    // const router = useRouter();

    useEffect(() => {
        if(language){
            axios.get(`/lang/${language}.json`).then((res:any) => {
                setLang(res.data.sitebar)
                if(pathname.slice(0, 10) == "/websites/"){
                    setSitebar([
                        {name: res.data.sitebar.dns, link: pathname.slice(0, -3) + "dns", active: [], icon: <SquareChartGantt className="h-[18px]"/>},
                        {name: res.data.sitebar.ssl, link: pathname.slice(0, -3) + "ssl", active: [], icon: <Lock className="h-[18px]"/>}
                    ])
                } else if(pathname.slice(0, 10) == "/account" || pathname == "/billing/finances" || pathname == "/billing/subscriptions"){
                    setSitebar([
                        {name: res.data.sitebar.account, link: "/account", active: [], icon: <User />},
                        {name: res.data.sitebar.billing, link: "/billing/finances", active: ['/billing/finances', '/billing/subscriptions'], icon: <Wallet className="h-[18px]"/>},
                        {name: res.data.sitebar.tariffs, link: "/tariffs", active: [], icon: <Rocket className="h-[18px]"/>},
                    ])
                } else {
                    setSitebar([
                        {name: res.data.sitebar.websites, link: "/websites", active: [], icon: <Proportions className="h-[18px]"/>},
                        {name: res.data.sitebar.accounts, link: "/accounts", active: [], icon: <Users className="h-[18px]"/>},
                        {name: res.data.sitebar.tariffs, link: "/tariffs", active: [], icon: <Rocket className="h-[18px]"/>},
                        // {name: res.data.sitebar.domain, link: "/domain", icon: <Globe />}
                    ])
                }
                
                setSitebarcontact([
                    // {name: res.data.sitebar.settings, link: "/settings", icon: <Settings />},
                    {name: res.data.sitebar.support, link: "https://t.me/xsname_support", icon: <Phone className="h-[18px]"/>}
                ])
            }).finally(() => {
                setLoading(false)
            });
        }
    }, [language, pathname])

    useEffect(() => {
    getLanguage().then(res => {
        setLanguage(res)
    })
    }, [])


    // if(loading){
    //     return <Loading />
    // }

    return(
        <div className={active? "fixed top-0 left-0 w-dvw h-dvh bg-gray-950/20 z-20 pointer-events-auto" : "fixed top-0 left-0 w-full h-full bg-gray-950/0 z-20 pointer-events-none"} onClick={() => setActive(!active)}>
            <div onClick={(e) => e.stopPropagation()} className={active? "fixed top-0 h-dvh bg-background w-[260px] max-md:translate-x-[0] transition-all pt-16 border-r pointer-events-auto" : "fixed top-0 h-dvh bg-background w-[260px] max-md:translate-x-[-100%] transition-all pt-16 border-r pointer-events-auto"}>
                <Link href='/tariffs' className="border-b flex h-14 items-center pl-4 pr-4 justify-between">
                    <p className="leading-7 [&:not(:first-child)]:mt-6 font-medium">{lang?.plan}</p>
                    <Badge className="tariff">{user?.subscribe == null ? "Free" : user?.subscribe?.name}</Badge>
                </Link>
                <div className="border-b flex flex-col gap-1 items-center pl-4 justify-between pt-5 pb-5">
                    {sitebar.map((item: any) => 
                        <Link onClick={() => setActive(false)} key={item.link} href={item.link} className={pathname == item.link || item.active.indexOf(pathname) != -1 ? `flex gap-4 border-primary/40 rounded-l-full border-l border-t border-b bg-primary/10 items-center w-full pt-2 pb-2 text-primary pl-5` : `flex gap-4 rounded-l-full hover:text-primary items-center w-full pt-2 pb-2 pl-5`} >
                            {item.icon}
                            <p className="leading-7 font-medium">{item.name}</p>
                        </Link>
                    )}
                </div>
                <div className="border-b flex flex-col gap-1 items-center pl-4 justify-between pt-5 pb-5">
                    {sitebarcontact.map((item: any) => 
                        <Link onClick={() => setActive(false)} key={item.link} href={item.link} className={pathname == item.link ? `flex gap-4 border-primary/40 rounded-l-full border-l border-t border-b bg-primary/10 items-center w-full pt-2 pb-2 text-primary pl-5` : `flex gap-4 rounded-l-full hover:text-primary items-center w-full pt-2 pb-2 pl-5`} >
                            {item.icon}
                            <p className="leading-7 font-medium">{item.name}</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}