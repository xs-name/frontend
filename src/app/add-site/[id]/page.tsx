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
import { getLanguage } from "@/lib/language";


export default function Home({params}:any) {

  if(!params.id){
    //http://localhost:3000/add-site/ed283e3987b1d606840ae88313d4ada0/2b1e83e4ba3dc3d1fecfc3c68e578861/dns
  }

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.add)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {isAuthorized?
      <div>
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="grid gap-2 mt-8 max-w-96">
                <Label htmlFor="email">{lang?.label}</Label>
                <Input className="w-full" type="text" placeholder="example.com" required />
            </div>
            <div className="flex mt-8 max-w-96 items-center justify-between">
                <Button>{lang?.button}</Button>
                <Link className="font-medium text-primary underline" href={""}>{lang?.create_domain}</Link>
            </div>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}