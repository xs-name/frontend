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
import { config, headers } from "@/lib/utils";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react";
import { getUser } from "@/lib/user";
import { useUserContext } from "@/components/userProvider";


export default function Home() {
  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [processLoading, setProcessLoading] = useState(false)

  const [domain, setDomain] = useState("");

  const router = useRouter()

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
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.add)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])


  function addDomain() {
    if(domain != ""){
      const data = {
        name: domain
      }
      axios.post(process.env.NEXT_PUBLIC_API + `/zones`, data, config).then((res:any) => {
        if(!res.data.error?.length){
          router.push(`/add-site/${res.data.result.account.id}/${res.data.result.id}/dns`)
          console.log(res.data)
        }else{
          toast("Произошла ошибка", {
            description: res.data.error[0]?.message
          })
        }
      }).finally(() => setProcessLoading(false))
    } else {
      toast("Произошла ошибка", {
        description: "Enter an existing domain name"
      })
      setProcessLoading(false)
    }
  }

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {user.length != 0?
      <div>
        <Toaster />
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="grid gap-2 mt-8 max-w-96">
              <Label htmlFor="email">{lang?.label}</Label>
              <Input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full" type="text" placeholder="example.com" required />
            </div>
            <div className="flex mt-8 max-w-96 items-center justify-between max-sm:flex-col max-sm:items-start max-sm:mt-4 max-sm:gap-2">
              <Button disabled={processLoading} onClick={() => {
                setProcessLoading(true)
                addDomain()
              }}>{processLoading? <div className="flex items-center gap-1 max-sm:w-full"><Loader2 className="animate-spin w-4 h-4"/> Загрузка</div> : lang?.button}</Button>
              {/* <Link className="font-medium text-primary underline" href={""}>{lang?.create_domain}</Link> */}
            </div>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
