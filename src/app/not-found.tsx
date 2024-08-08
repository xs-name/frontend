/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import AuthPage from "@/components/AuthPage.component";
import { useLanguageContext } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Loading } from "@/components/Loading.components";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";


export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.not_found)
        setLoading(false)
        // setLoadingWebsites(false)
      });
    }
  }, [language])

  if(loading){
    return <Loading />
  }

  return (
    <main className="flex items-center justify-center flex-col h-dvh w-dvw">
      <span className="text-9xl font-extrabold tracking-tight flex items-center mb-2">4<Ban className="w-24 h-24 stroke-[4px]"/>4</span>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{lang?.title}</h1>
      <Link href="/"><Button className="mt-5">На главную</Button></Link>
    </main>
  );
}
