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
  const router = useRouter()
  const searchParams = useSearchParams()


  const { userTelegram, webApp } = useTelegram();
  console.log(userTelegram);
  

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.home)
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
      {user.length != 0?
        <></>
      : 
      searchParams.get('method') == 'webapp'?
          <div className="flex items-center justify-center h-dvh">
            <div className="max-w-[400px] mb-[200px] p-8">
              <img className="w-[120px] mb-4" src="/logo.svg" alt="" />
              <h1 className="text-3xl font-bold">CloudFlare Helper</h1>
              <p className="description text-muted-foreground mt-4">This is a web assistant for managing domains from different accounts.</p>

              <p className="flex gap-2 items-center mt-10">
                <Loader2 className="animate-spin w-6 h-6 text-muted-foreground"/>
                <span className="text-muted-foreground text-sm">Logging in to your account</span>
              </p>
            </div>
          </div>
      :
      <AuthPage />}
    </main>
  );
}
