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
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { headers } from "@/lib/utils";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react";


export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [processLoading, setProcessLoading] = useState(false)

  const [domain, setDomain] = useState("");

  const router = useRouter()



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

  function addDomain() {
    setProcessLoading(true)
    if(domain != ""){
      const data = {
        name: domain
      }
      axios.post(process.env.NEXT_PUBLIC_API + `/zones`, data, {headers: headers}).then((res:any) => {
        if(!res.data.error?.length){
          router.push(`/add-site/${res.data.result.account.id}/${res.data.result.id}/dns`)
          console.log(res.data)
        }else{
          toast("Произошла ошибка", {
            description: res.data.error[0]?.message
          })
        }
      })
    } else {
      toast("Произошла ошибка", {
        description: "Enter an existing domain name"
      })
    }
    setProcessLoading(false)
  }

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {isAuthorized?
      <div>
        <Toaster />
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="grid gap-2 mt-8 max-w-96">
              <Label htmlFor="email">{lang?.label}</Label>
              <Input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full" type="text" placeholder="example.com" required />
            </div>
            <div className="flex mt-8 max-w-96 items-center justify-between max-sm:flex-col max-sm:items-start max-sm:mt-4 max-sm:gap-2">
              <Button onClick={() => {
                setProcessLoading(true)
                addDomain()
              }}>{processLoading? <Loader2 className="animate-spin w-5 h-5"/> : lang?.button}</Button>
              <Link className="font-medium text-primary underline" href={""}>{lang?.create_domain}</Link>
            </div>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
