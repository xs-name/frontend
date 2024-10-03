/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import AuthPage from "@/components/AuthPage.component";
import { useLanguageContext } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading.components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, MoveLeft } from "lucide-react";
import { getLanguage } from "@/lib/language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { config, headers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";

export default function SSL() {

  const {user, setUser} = useUserContext();
  const { language, setLanguage } = useLanguageContext();
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<any>([]);

  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [telegramOpen, setTelegramOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [inpitPassword, setInpitPassword] = useState(true)
  const [inpitPassword2, setInpitPassword2] = useState(true)
  const [telegram, setTelegram] = useState("");

  function clearData(){
    setNewEmail("")
    setOldPassword("")
    setPassword("")
    setInpitPassword(true)
    setInpitPassword2(true)
    setTelegram("")
  }

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
    })
  }, [])



  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.settings);
          // setLoadingWebsites(false)
        })
        .finally(() => setLoading(false));
    }
  }, [language]);


  function changeLang(value: any){
    if(!value){
      axios.patch(process.env.NEXT_PUBLIC_API + "/account/settings/language", {value: 'en'}, config)
    } else {
      axios.patch(process.env.NEXT_PUBLIC_API + "/account/settings/language", {value: value}, config)
    }
    setUser({...user, language: value})
    setLanguage(value)
  }

  function changeEmail(){
    if(/^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z]+$/.test(newEmail)){
      const data = {
        email: newEmail,
        password: password
      }
      axios.patch(process.env.NEXT_PUBLIC_API + "/account/settings/email", data, config).then((res) => {
        if(res.data.error.length == 0){
          toast("Успех!", {
            description: "Email успешно изменён"
          })
          setEmailOpen(false)
          setUser({...user, email: newEmail})
          setNewEmail("")
          setPassword("")
          setLoadingData(false)
        } else {
          toast("Произошла ошибка", {
            description: res.data.error[0].message
          })
          setLoadingData(false)
        }
      })
    } else {
      toast("Произошла ошибка", {
        description: "Пожалуйста, укажите корректный email"
      })
      setLoadingData(false)
    }
  }

  function changePassword(){
    // if(/^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z]+$/.test(newEmail)){
    const data = {
      old_password: oldPassword,
      new_password: password
    }
    axios.patch(process.env.NEXT_PUBLIC_API + "/account/settings/password", data, config).then((res) => {
      if(res.data.error.length == 0){
        toast("Успех!", {
          description: "Пароль успешно изменён"
        })
        setPasswordOpen(false)
        setOldPassword("")
        setPassword("")
        setLoadingData(false)
      } else {
        toast("Произошла ошибка", {
          description: res.data.error[0].message
        })
        setLoadingData(false)
      }
    })
  }

  function changeTelegram(){
    // if(/^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z]+$/.test(newEmail)){
    const data = {
      telegram: telegram,
      password: password
    }
    axios.patch(process.env.NEXT_PUBLIC_API + "/account/settings/telegram", data, config).then((res) => {
      if(res.data.error.length == 0){
        toast("Успех!", {
          description: "Телеграм успешно изменён"
        })
        setTelegramOpen(false)
        setPassword("")
        setTelegram("")
        setUser({...user, telegram: telegram})
        setLoadingData(false)
      } else {
        toast("Произошла ошибка", {
          description: res.data.error[0].message
        })
        setLoadingData(false)
      }
    })
    // } else {
    //   toast("Произошла ошибка", {
    //     description: "Пожалуйста, укажите корректный email"
    //   })
    //   setLoadingData(false)
    // }
  }

  if (loading) {
    return <Loading />;
  }


  return (
    <main>
      {user.length != 0? (
        <div>
          <Nav />
          <Toaster />
          <AlertDialog open={emailOpen} onOpenChange={setEmailOpen}>
            <AlertDialogTrigger>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{lang?.change_email}</AlertDialogTitle>
                <AlertDialogDescription>
                  {lang?.change_email_desc} <b>{user?.email}</b>
                </AlertDialogDescription>
                <div className='max-lg:w-full'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.new_email}</Label>
                  <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="text"/>
                </div>
                <div className='max-lg:w-full mb-1'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.password}</Label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type={inpitPassword ? "password" : "text"} icon={inpitPassword ? <Eye onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" />}/>
                </div> 
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loadingData} onClick={() => clearData()}>{lang?.cancel}</AlertDialogCancel>
                <Button disabled={loadingData} onClick={() => {
                  setLoadingData(true)
                  changeEmail()
                }} >{loadingData ? <Loader2 className="animate-spin w-5 h-5"/> : lang?.continue}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={passwordOpen} onOpenChange={setPasswordOpen}>
            <AlertDialogTrigger>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{lang?.change_password}</AlertDialogTitle>
                <AlertDialogDescription>
                  {lang?.change_password_desc}
                </AlertDialogDescription>
                <div className='max-lg:w-full'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.old_password}</Label>
                  <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type={inpitPassword2 ? "password" : "text"} icon={inpitPassword2 ? <Eye onClick={() => setInpitPassword2(!inpitPassword2)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword2(!inpitPassword2)} className="absolute right-2 text-muted-foreground cursor-pointer" />}/>
                </div>
                <div className='max-lg:w-full mb-1'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.new_password}</Label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type={inpitPassword ? "password" : "text"} icon={inpitPassword ? <Eye onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" />}/>
                </div> 
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loadingData} onClick={() => clearData()}>{lang?.cancel}</AlertDialogCancel>
                <Button disabled={loadingData} onClick={() => {
                  setLoadingData(true)
                  changePassword()
                }} >{loadingData ? <Loader2 className="animate-spin w-5 h-5"/> : lang?.continue}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={telegramOpen} onOpenChange={setTelegramOpen}>
            <AlertDialogTrigger>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{lang?.change_telegram}</AlertDialogTitle>
                <AlertDialogDescription>
                  {lang?.change_telegram_desc}
                </AlertDialogDescription>
                <div className='max-lg:w-full'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.telegram}</Label>
                  <Input value={telegram} onChange={(e) => setTelegram(e.target.value)} />
                </div>
                <div className='max-lg:w-full mb-1'>
                  <Label className="text-xs text-muted-foreground mt-1">{lang?.password}</Label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type={inpitPassword ? "password" : "text"} icon={inpitPassword ? <Eye onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" />}/>
                </div> 
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loadingData} onClick={() => clearData()}>{lang?.cancel}</AlertDialogCancel>
                <Button disabled={loadingData} onClick={() => {
                  setLoadingData(true)
                  changeTelegram()
                }} >{loadingData ? <Loader2 className="animate-spin w-5 h-5"/> : lang?.continue}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{lang?.settings}</h1>
              <p className="leading-7 mb-5">
                {lang?.settings_description}
              </p>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">{lang?.Language_preference}</p>
                  <p className="mt-3 mb-3">{lang?.Language_preference_desc}</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Select value={user?.language} onValueChange={(value) => changeLang(value)}>
                    <SelectTrigger className="w-[150px] mt-1" defaultValue="1.0">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">{lang?.email_address}</p>
                  <p className="mt-3 mb-3">{user?.email}</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Button onClick={() => setEmailOpen(true)}>{lang?.change_email}</Button>
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">{lang?.password}</p>
                  <p className="mt-3 mb-3">{lang?.password_description}</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Button onClick={() => setPasswordOpen(true)}>{lang?.change_password}</Button>
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">{lang?.telegram}</p>
                  <p className="mt-3 mb-3">{user?.telegram}</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Button onClick={() => setTelegramOpen(true)}>{lang?.change_telegram}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
