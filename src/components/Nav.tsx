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
        if(language){
            setPosition(language)
            axios.get(`/lang/${language}.json`).then((res:any) => {
                setLang(res.data.nav)
                setLoading(false)
            });
        }
    }, [language])

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
                    <div onClick={() => setSitebar(!sitebar)} className="hidden h-full items-center justify-center w-16 cursor-pointer max-md:flex">
                        <Menu className={sitebar ? "opacity-0 transition-all absolute" : "opacity-1 transition-all absolute"}/>
                        <X className={sitebar ? "opacity-1 transition-all absolute" : "opacity-0 transition-all absolute"}/>
                    </div>
                    <Link href="/"><img className="w-16" src="/logo.svg" alt="logo" /></Link>
                </div>
                <div className="flex h-full items-center space-x-4 text-sm">
                    <div className="h-full flex items-center gap-1 cursor-pointer max-md:hidden"> <Plus className="h-4"/>{lang?.connect}</div>
                    <Separator orientation="vertical" className="h-5 max-md:hidden"/>
                    <div className="h-full flex items-center gap-1 cursor-pointer max-md:hidden"><Import className="h-4"/>{lang?.import}</div>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <div className="flex items-center gap-1 h-full cursor-pointer"><UserRound className="h-4"/>{lang?.account}</div>
                            {/* <Button variant="outline">Open</Button> */}
                            {/* <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar> */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 left-10">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                    {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            {/* <DropdownMenuSeparator /> */}
                            {/* <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Separator orientation="vertical" className="h-5"/>
                    <div className="h-full flex items-center cursor-pointer max-md:pr-5"><LogOut className="w-5 cursor-pointer"/></div>
                </div>
            </div>
        </>
    );
}

export default Nav;