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
import { Loader2, MoveLeft } from "lucide-react";
import { getLanguage } from "@/lib/language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch";

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

import { headers } from "@/lib/utils";
import { notFound, useRouter } from "next/navigation";

export default function SSL({ params }: any) {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [loadingFetch, setLoadingFetch] = useState(true)
  const [domain, setDomain] = useState<any>([]);

  const [SSL, setSSL] = useState('');
  const [TSL13, setTSL13] = useState(false);
  const [HTTPSRewrites, setHTTPSRewrites] = useState(false);
  const [AlwaysHTTPS, setAlwaysHTTPS] = useState(false);
  const [SSLTLS, setSSLTLS] = useState(false);
  const [minTLS, setMinTLS] = useState('')

  const router = useRouter()

  const [loadingSettings, setLoadingSettiongs] = useState<any>([]);
  
  const [settings, setSettings] = useState([]);
  const [fetchSSL, setFetchSSL] = useState(false)

  const [open, setOpen] = useState(false);
  const [openText, setOpenText] = useState<any>({
    type: null,
    value: null,
    setType: null,
    to: "",
    from: ""
  });

  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.ssl);
          // setLoadingWebsites(false)
        })
        .finally(() => setLoading(false));
    }
  }, [language]);

  function updateSettings(){
    axios.get(process.env.NEXT_PUBLIC_API + `/zones/settings/${params.account}/${params.id}`, {headers: headers}).then((res:any) => {
      console.log(res.data)
      if(!res.data.error?.length){
        setSettings(res.data.result)
        setSSL(res.data.result.find((el: any) => el.id === "ssl").value)
        setTSL13(res.data.result.find((el: any) => el.id === "tls_1_3").value == 'on')
        setHTTPSRewrites(res.data.result.find((el: any) => el.id === "automatic_https_rewrites").value == 'on')
        setAlwaysHTTPS(res.data.result.find((el: any) => el.id === "always_use_https").value == 'on')
        // setSSLTLS(res.data.result.find((el: any) => el.id === "ssl_recommender").value == 'on')
        setMinTLS(res.data.result.find((el: any) => el.id === "min_tls_version").value)
        
        setLoadingFetch(false)
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    })


  }

  useEffect(() => {
    if(params.account && params.id){
      updateSettings()

      axios.get(process.env.NEXT_PUBLIC_API + `/zones/${params.account}/${params.id}`, {headers: headers}).then((res:any) => {
        if(!res.data.error?.length){
          setDomain(res.data.result)
        }else{
          //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
        }
      })
    }
  }, [])

  function changeSettingsSSL(){
    setFetchSSL(true)

    const data: any = {
      value: openText.value
    }

    axios.patch(process.env.NEXT_PUBLIC_API + `/zones/settings/${params.account}/${params.id}/${openText.type}`, data, {headers: headers}).then((res:any) => {
      if(!res.data.error?.length){
        updateSettings()
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
        updateSettings()
      }
    }).finally(() => {
      setOpen(false)
      setFetchSSL(false)
    })
  }

  function changeSettings (type: any, value: any, setType: any) {
    console.log(type, value)
    if(type == "ssl"){
      setOpenText({
        type: type,
        value: value,
        setType: setType,
        to: SSL,
        from: value
      })
      setOpen(true)
      return
    }
    setLoadingSettiongs([...loadingSettings, type])

    const data: any = {}

    if(type == "always_use_https" || type == "tls_1_3" || type == "automatic_https_rewrites"){
      data.value = value ? 'on' : 'off'
    } else{
      data.value = value
    }
    
    if(type == "min_tls_version"){
      setType(value)
    } else {
      setType(value)
    }

    axios.patch(process.env.NEXT_PUBLIC_API + `/zones/settings/${params.account}/${params.id}/${type}`, data, {headers: headers}).then((res:any) => {
      if(!res.data.error?.length){
        updateSettings()
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
        updateSettings()
      }
    }).finally(() => setLoadingSettiongs(loadingSettings.filter((obj: any) => obj != type)))
    
  }


  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  function further(){
    // if(DNS.data.length > 0){
      router.push(`/add-site/${params.account}/${params.id}/ns`)
    // } else {
    //   toast("Произошла ошибка", {
    //     description: "Пожалуйста, добавьте хотя бы 1 DNS"
    //   })
    // }
  }

  if (loading) {
    return <Loading />;
  }

  if(!params.account || !params.id){
    return notFound()
  }

  return (
    <main>
      {isAuthorized ? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              {loadingFetch ? <div className="flex gap-2 items-center"><Loader2 className="animate-spin w-5 h-5"/> {lang?.loading}</div>
              :
              <>
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {domain?.name}
                </h1>
                <p className="leading-7">
                  Customize your edge certificates
                </p>

                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are switching your SSL mode from <b>{openText.to}</b> to <b>{openText.from}</b>. Are you sure you want to make that change?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button onClick={() => changeSettingsSSL()}>{fetchSSL ? <Loader2 className="animate-spin w-5 h-5"/> : "Continue"}</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="flex flex-col rounded-md mt-4">
                  <p className="text-xl font-semibold">Your SSL/TLS encryption mode is flexible</p>
                  <div className="">
                    <RadioGroup value={SSL} onValueChange={(value) => changeSettings('ssl', value, setSSL)} defaultValue="comfortable" className="grid mt-4 gap-4 grid-cols-2 max-lg:grid-cols-none">
                      <div className="border p-4 flex items-center gap-1 rounded-sm">
                        <RadioGroupItem value="off" id="r1" className="min-w-4 mr-2"/>
                        <Label htmlFor="r1" className="mt-2 mb-2 flex flex-col gap-3">
                          <p className="text-lg">Off (not secure)</p>
                          <p className="leading-5">No encryption applied. Turning off SSL disables HTTPS and causes browsers to show a warning that your website is not secure.</p>
                        </Label>
                      </div>
                      <div className="border p-4 flex items-center gap-1 rounded-sm">
                        <RadioGroupItem value="flexible" id="r2" className="min-w-4 mr-2"/>
                        <Label htmlFor="r2" className="mt-2 mb-2 flex flex-col gap-3">
                          <p className="text-lg">Flexible</p>
                          <p className="leading-5">Enable encryption only between your visitors and Cloudflare. This avoids browser security warnings, but all connections between Cloudflare and your origin are made through HTTP.</p>
                        </Label>
                      </div>
                      <div className="border p-4 flex items-center gap-1 rounded-sm">
                        <RadioGroupItem value="full" id="r3" className="min-w-4 mr-2"/>
                        <Label htmlFor="r3" className="mt-2 mb-2 flex flex-col gap-3">
                          <p className="text-lg">Full</p>
                          <p className="leading-5">Enable encryption end-to-end. Use this mode when your origin server supports SSL certification but does not use a valid, publicly trusted certificate.</p>
                        </Label>
                      </div>
                      <div className="border p-4 flex items-center gap-1 rounded-sm">
                        <RadioGroupItem value="strict" id="r4" className="min-w-4 mr-2"/>
                        <Label htmlFor="r4" className="mt-2 mb-2 flex flex-col gap-3">
                          <p className="text-lg">Full (script)</p>
                          <p className="leading-5">(Recommended mode) Enable encryption end-to-end and enforce validation on origin certificates. Use Cloudflare’s Origin CA to generate certificates for your origin.</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="flex pt-4 pb-4 justify-end">
                  <Button onClick={() => {
                    further()
                  }}>Continue</Button>
                </div>
              </>
              }
            </div>
          </div>
        </div>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
