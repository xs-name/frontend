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
    Import
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

const Nav = () => {
    const [position, setPosition] = useState("")
    const {language, setLanguage} = useLanguageContext()
    const [lang, setLang] = useState<any>();
    const [loading, setLoading] = useState(true)

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
        <div className="z-30 bg-background fixed w-full h-16 shadow-sm shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2 flex items-center pl-10 pr-10 justify-between">
            <Link href="/"><img className="w-16" src="/logo.svg" alt="logo" /></Link>
            <div className="flex h-full items-center space-x-4 text-sm">
                <div className="h-full flex items-center gap-1 cursor-pointer"> <Plus className="h-4"/>{lang?.connect}</div>
                <Separator orientation="vertical" className="h-5"/>
                <div className="h-full flex items-center gap-1 cursor-pointer"><Import className="h-4"/>{lang?.import}</div>
                <Separator orientation="vertical" className="h-5"/>
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <div className="h-full flex items-center gap-1 cursor-pointer"><Languages  className="h-4"/> {lang?.language}</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>{lang?.language}</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="ru">Russian</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" className="h-5"/>
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
                <div className="h-full flex items-center cursor-pointer"><LogOut className="w-5 cursor-pointer"/></div>
            </div>
        </div>
    );
}

export default Nav;