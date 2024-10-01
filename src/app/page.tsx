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
        router.push('/websites') // Временно!
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
      <AuthPage />}
    </main>
  );
}
