/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import AuthPage from "@/components/AuthPage.component";
import { useLanguageContext } from "@/components/LanguageProvider";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';

import { Loading } from "@/components/Loading.components";
import { getLanguage } from "@/lib/language";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from "lucide-react";
import { useTelegram } from "@/components/TelegramProvider";

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { config } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [loadingWebsites, setLoadingWebsites] = useState(true)

  //Храним все домены
  const [domains, setDomains] = useState([]);
  const [domainsAll, setDomainsAll] = useState([]);
  const [domainsVisible, setDomainsVisible] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [params, setParams] = useState<any>();
  const router = useRouter()

  const [noAuth, setNoAuth] = useState(false);

  const { userTelegram, webApp } = useTelegram();

  useEffect(() => {
    
    if(webApp){
      axios.post(process.env.NEXT_PUBLIC_API + '/account/authorization/webapp', webApp?.initDataUnsafe, config).then((res) => {
        if(res.data.error.length > 0){
          // toast(lang?.error, {
          //   description: res.data.error[0].message,
          // })
          setNoAuth(true)
        } else {
          // console.log(res.data)
          if(res.data.result[0].type == "redirect"){
            router.push(res.data.result[0].location)
          }
        }
      })
    }
  }, [webApp])
  

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.webapp)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        // router.push('/websites') // Временно!
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      
      setUser(res)
    })
  }, [])

  useEffect(() => {
    const domainsTemp = Array.from(domains);
    setDomainsVisible(domainsTemp.splice((page - 1) * 12, 12))
  }, [page])

  function filterByCity(arr: any, name: any) {
    return arr.filter(function(item: any, i: any, arr: any) {
      // console.log(item.name.includes(name))
      return (item.name.includes(name));
    });
  };


  if(loading){
    return <Loading />
  }

  return (
    <main>
      <Toaster />

        <div className="flex items-center justify-center h-dvh">
            <div className="max-w-[400px] mb-[200px] m-8">
            <img className="w-[80px] mb-4" src="/logo.svg" alt="" />
            <h1 className="text-3xl font-bold">XSNANE Dashboard</h1>
            <p className="description text-muted-foreground mt-4">{lang?.webapp_desc}</p>

            {noAuth ? 
            <p className="flex gap-2 gap-4 items-start flex-col mt-10">
              <span className="text-muted-foreground text-sm border-l-4 border-primary pl-3">{lang?.no_account_1} <span className="text-primary font-bold">/start</span> {lang?.no_account_2}</span>
              <Button className="mt-4" onClick={() => webApp?.close()}>{lang?.close}</Button>
            </p>
            :
            <p className="flex gap-2 items-center mt-10">
                <Loader2 className="animate-spin w-6 h-6 text-muted-foreground"/>
                <span className="text-muted-foreground text-sm">{lang?.logging}</span>
            </p>
            }
            
            </div>
        </div>
    </main>
  );
}
