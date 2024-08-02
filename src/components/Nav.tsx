'use client'
/* eslint-disable @next/next/no-img-element */
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
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
  } from "lucide-react"
   
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuCheckboxItem,
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
import { useState } from "react"

const Nav = () => {
    const [position, setPosition] = useState("bottom")

    return (
        <div className="fixed w-full h-16 shadow-sm shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2 flex items-center pl-10 pr-10 justify-between">
            <img className="w-16" src="/logo.svg" alt="logo" />
            <div className="flex h-5 items-center space-x-4 text-sm">
                <div className="h-full">Connect</div>
                <Separator orientation="vertical" />
                <div className="h-full">Import</div>
                <Separator orientation="vertical" />
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <div>Language</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem value="top">English</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">Russian</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <div className="flex items-center gap-1"><UserRound className="h-4"/>Account</div>
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
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" />
                <div>Log out</div>
            </div>
        </div>
    );
}

export default Nav;