'use client'
/* eslint-disable @next/next/no-img-element */
import {
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    UserRound,
    Users,
    Languages,
    Import,
    Menu,
    X
  } from "lucide-react"
  import Link from "next/link";
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
  } from "@/components/ui/dropdown-menu"

  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { useLanguageContext } from "./LanguageProvider";
import axios from 'axios';
import { Loading } from "./Loading.components";
import { setCookieLanguage } from "@/lib/language";
import { Sitebar } from "./Sitebar.components";

const Nav = () => {
    const [position, setPosition] = useState("")
    const {language, setLanguage} = useLanguageContext()
    const [lang, setLang] = useState<any>();
    const [loading, setLoading] = useState(true)

    const [sitebar, setSitebar] = useState(false);

    useEffect(() => {
        loadingPage()
    }, [language])

    useEffect(() => {
        loadingPage()
    }, [])

    function loadingPage() {
        if(language){
            setPosition(language)
            axios.get(`/lang/${language}.json`).then((res:any) => {
                setLang(res.data.nav)
            }).finally(() => setLoading(false));
        }
    }

    //Сменя языка
    useEffect(() => {
        if(position != language){
            setCookieLanguage(position).then(res => {
                setLanguage(res)
            })
        }
    }, [position])

    if(loading){
        return <Loading />
    }

    return (
        <>
            {/* SITEBAR */}
            <Sitebar active={sitebar} setActive={setSitebar}/>
            {/* SITEBAR */}
            <div className="z-30 bg-background fixed w-full h-16 shadow-sm shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2 flex items-center pl-10 pr-10 max-md:pl-0 max-md:pr-0 justify-between">
                <div className="flex h-full items-center">
                    <div onClick={() => setSitebar(!sitebar)} className="hidden h-full items-center justify-center w-16 cursor-pointer max-md:flex max-md:border-r max-md:mr-2">
                        <Menu className={sitebar ? "opacity-0 transition-all absolute" : "opacity-1 transition-all absolute"}/>
                        <X className={sitebar ? "opacity-1 transition-all absolute" : "opacity-0 transition-all absolute"}/>
                    </div>
                    <Link href="/websites"><img className="w-16" src="/logo.svg" alt="logo" /></Link>
                </div>
                <div className="flex h-full items-center space-x-4 text-sm">
                    <Link href="/add-site" className="h-full flex items-center gap-1 cursor-pointer max-md:hidden"> <Plus className="h-4"/>{lang?.connect}</Link>
                    <Separator orientation="vertical" className="h-5 max-md:hidden"/>
                    <Link href='/accounts/add' className="h-full flex items-center gap-1 cursor-pointer max-md:hidden"><Import className="h-4"/>{lang?.import}</Link>
                    <Separator orientation="vertical" className="h-5 max-md:hidden"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer max-md:hidden" asChild>
                            <div className="h-full flex items-center gap-1 cursor-pointer"><Languages  className="h-4"/> {lang?.language}</div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 max-md:hidden">
                            <DropdownMenuLabel>{lang?.language}</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="ru">Russian</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Separator orientation="vertical" className="h-5 max-md:hidden"/>
                    <Link href="/account" className="h-full flex items-center gap-1 cursor-pointer max-md:hidden"> <UserRound className="h-4"/>{lang?.account}</Link>
                    <Separator orientation="vertical" className="h-5"/>
                    <div className="h-full flex items-center cursor-pointer max-md:pr-5"><LogOut className="w-5 cursor-pointer"/></div>
                </div>
            </div>
        </>
    );
}

export default Nav;