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
import { MoveLeft } from "lucide-react";
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

export default function SSL({ params }: any) {
  if (!params.id) {
    //http://localhost:3000/add-site/ed283e3987b1d606840ae88313d4ada0/2b1e83e4ba3dc3d1fecfc3c68e578861/dns
  }

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.add);
          // setLoadingWebsites(false)
        })
        .finally(() => setLoading(false));
    }
  }, [language]);

  useEffect(() => {
    getLanguage().then(res => {
        setLanguage(res)
    })
  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {isAuthorized ? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                wanddecisions.com
              </h1>
              <p className="leading-7">
                Customize your edge certificates, which encrypt traffic.
              </p>
              <Link
                className="font-medium text-primary text-sm flex gap-1 items-center mt-2 hover:text-primary/80"
                href={"/"}
              >
                <MoveLeft className="h-4" />
                Назад к веб-сайтам
              </Link>

              <div className="flex flex-col border rounded-md mt-8 mb-8 p-5">
                <p className="text-xl font-semibold">Your SSL/TLS encryption mode is flexible</p>
                <div className="">
                  <RadioGroup defaultValue="comfortable" className="grid mt-8 gap-4 grid-cols-2 max-lg:grid-cols-none">
                    <div className="border p-4 flex items-center gap-1 rounded-sm">
                      <RadioGroupItem value="default" id="r1" className="min-w-4 mr-2"/>
                      <Label htmlFor="r1" className="mt-2 mb-2 flex flex-col gap-3">
                        <p className="text-lg">Off (not secure)</p>
                        <p className="leading-5">No encryption applied. Turning off SSL disables HTTPS and causes browsers to show a warning that your website is not secure.</p>
                      </Label>
                    </div>
                    <div className="border p-4 flex items-center gap-1 rounded-sm">
                      <RadioGroupItem value="comfortable" id="r2" className="min-w-4 mr-2"/>
                      <Label htmlFor="r2" className="mt-2 mb-2 flex flex-col gap-3">
                        <p className="text-lg">Flexible</p>
                        <p className="leading-5">Enable encryption only between your visitors and Cloudflare. This avoids browser security warnings, but all connections between Cloudflare and your origin are made through HTTP.</p>
                      </Label>
                    </div>
                    <div className="border p-4 flex items-center gap-1 rounded-sm">
                      <RadioGroupItem value="compact" id="r3" className="min-w-4 mr-2"/>
                      <Label htmlFor="r3" className="mt-2 mb-2 flex flex-col gap-3">
                        <p className="text-lg">Full</p>
                        <p className="leading-5">Enable encryption end-to-end. Use this mode when your origin server supports SSL certification but does not use a valid, publicly trusted certificate.</p>
                      </Label>
                    </div>
                    <div className="border p-4 flex items-center gap-1 rounded-sm">
                      <RadioGroupItem value="3" id="r4" className="min-w-4 mr-2"/>
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
                  <Switch id="airplane-mode" />
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">SSL/TLS Recommender</p>
                  <p className="mt-3 mb-3">Check if your domain can use a stronger SSL/TLS encryption mode. SSL/TLS Recommender runs a periodic origin scan and sends you an email if a more secure option is possible.</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Switch id="airplane-mode" />
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">Minimum TLS Version</p>
                  <p className="mt-3 mb-3">Only allow HTTPS connections from visitors that support the selected TLS protocol version or newer.</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Select>
                    <SelectTrigger className="w-[150px] mt-1" defaultValue="1.0">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1.0">TLS 1.0 (default)</SelectItem>
                        <SelectItem value="1.1">TLS 1.1</SelectItem>
                        <SelectItem value="1.2">TLS 1.2</SelectItem>
                        <SelectItem value="1.3">TLS 1.3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">TLS 1.3</p>
                  <p className="mt-3 mb-3">Enable the latest version of the TLS protocol for improved security and performance.</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Switch id="airplane-mode" />
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">Automatic HTTPS Rewrites</p>
                  <p className="mt-3 mb-3">Automatic HTTPS Rewrites helps fix mixed content by changing “http” to “https” for all resources or links on your web site that can be served with HTTPS.</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Switch id="airplane-mode" />
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
