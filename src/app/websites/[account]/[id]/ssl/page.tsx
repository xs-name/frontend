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
import { notFound } from "next/navigation";

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
                  Customize your edge certificates, which encrypt traffic.
                </p>
                <Link
                  className="font-medium text-primary text-sm flex gap-1 items-center mt-2 hover:text-primary/80"
                  href={"/websites"}
                >
                  <MoveLeft className="h-4" />
                  Назад к веб-сайтам
                </Link>

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

                <div className="flex flex-col border rounded-md mt-8 mb-8 p-5">
                  <p className="text-xl font-semibold">Your SSL/TLS encryption mode is flexible</p>
                  <div className="">
                    <RadioGroup value={SSL} onValueChange={(value) => changeSettings('ssl', value, setSSL)} defaultValue="comfortable" className="grid mt-8 gap-4 grid-cols-2 max-lg:grid-cols-none">
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

                <div className="flex border rounded-md mb-8 max-lg:flex-col">
                  <div className="p-5 w-2/3 max-lg:w-full">
                    <p className="text-xl font-semibold">Always Use HTTPS</p>
                    <p className="mt-3 mb-3">Redirect all requests with scheme “http” to “https”. This applies to all http requests to the zone.</p>
                  </div>
                  <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                    <Switch checked={AlwaysHTTPS} onCheckedChange={(value: boolean) => changeSettings('always_use_https', value, setAlwaysHTTPS)} id="airplane-mode" />
                    {loadingSettings.map((item: any) => 
                      item === 'always_use_https' ?
                      <Loader2 key={item} className="animate-spin w-5 h-5 ml-2"/> : null
                    )}
                  </div>
                </div>

                {/* <div className="flex border rounded-md mb-8 max-lg:flex-col">
                  <div className="p-5 w-2/3 max-lg:w-full">
                    <p className="text-xl font-semibold">SSL/TLS Recommender</p>
                    <p className="mt-3 mb-3">Check if your domain can use a stronger SSL/TLS encryption mode. SSL/TLS Recommender runs a periodic origin scan and sends you an email if a more secure option is possible.</p>
                  </div>
                  <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                    <Switch checked={SSLTLS} onCheckedChange={(value: boolean) => changeSettings('ssl_recommender', value, setSSL)} id="airplane-mode" />
                    {loadingSettings.map((item: any) => 
                      item === 'ssl_recommender' ?
                      <Loader2 key={item} className="animate-spin w-5 h-5 ml-2"/> : null
                    )}
                  </div>
                </div> */}

                <div className="flex border rounded-md mb-8 max-lg:flex-col">
                  <div className="p-5 w-2/3 max-lg:w-full">
                    <p className="text-xl font-semibold">Minimum TLS Version</p>
                    <p className="mt-3 mb-3">Only allow HTTPS connections from visitors that support the selected TLS protocol version or newer.</p>
                  </div>
                  <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                    <Select value={minTLS} onValueChange={(value) => changeSettings('min_tls_version', value, setMinTLS)}>
                      <SelectTrigger className="w-[150px] mt-1" defaultValue="1.0">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1.0">TLS 1.0</SelectItem>
                          <SelectItem value="1.1">TLS 1.1</SelectItem>
                          <SelectItem value="1.2">TLS 1.2</SelectItem>
                          <SelectItem value="1.3">TLS 1.3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {loadingSettings.map((item: any) => 
                      item === 'min_tls_version' ?
                      <Loader2 key={item} className="animate-spin w-5 h-5 ml-2"/> : null
                    )}
                  </div>
                </div>

                <div className="flex border rounded-md mb-8 max-lg:flex-col">
                  <div className="p-5 w-2/3 max-lg:w-full">
                    <p className="text-xl font-semibold">TLS 1.3</p>
                    <p className="mt-3 mb-3">Enable the latest version of the TLS protocol for improved security and performance.</p>
                  </div>
                  <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                    <Switch id="airplane-mode" checked={TSL13} onCheckedChange={(value: boolean) => changeSettings('tls_1_3', value, setTSL13)}  />
                    {loadingSettings.map((item: any) => 
                      item === 'tls_1_3' ?
                      <Loader2 key={item} className="animate-spin w-5 h-5 ml-2"/> : null
                    )}
                  </div>
                </div>

                <div className="flex border rounded-md mb-8 max-lg:flex-col">
                  <div className="p-5 w-2/3 max-lg:w-full">
                    <p className="text-xl font-semibold">Automatic HTTPS Rewrites</p>
                    <p className="mt-3 mb-3">Automatic HTTPS Rewrites helps fix mixed content by changing “http” to “https” for all resources or links on your web site that can be served with HTTPS.</p>
                  </div>
                  <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                    <Switch id="airplane-mode" checked={HTTPSRewrites} onCheckedChange={(value: boolean) => changeSettings('automatic_https_rewrites', value, setHTTPSRewrites)}/>
                    {loadingSettings.map((item: any) => 
                      item === 'automatic_https_rewrites' ?
                      <Loader2 key={item} className="animate-spin w-5 h-5 ml-2"/> : null
                    )}
                  </div>
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
