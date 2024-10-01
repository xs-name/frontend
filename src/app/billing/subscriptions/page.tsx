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

import { config, headers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";

export default function SSL() {

  const {user, setUser} = useUserContext();
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState<any>([])

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
      getSub()
    })
  }, [])

  function getSub() {
    axios.get(process.env.NEXT_PUBLIC_API + '/account/subscriptions/purchases', config).then((res: any) => {
      if(res.data.error.length == 0){
        let sub = res.data.result
        sub = sub.sort((a: any, b: any) => new Date(a.start_date) < new Date(b.start_date) ? 1 : -1)
        setSub(res.data.result)
      }
    })
  }


  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.billing);
          // setLoadingWebsites(false)
        })
        .finally(() => setLoading(false));
    }
  }, [language]);

  if (loading) {
    return <Loading />;
  }


  return (
    <main>
      {user.length != 0? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{lang?.billing}</h1>
              <p className="leading-7 mb-5">
                {lang?.billing_desctiption_sub}
              </p>

                <div className="flex gap-8 max-xl:flex-col">
                    <div className="flex flex-col w-[200px] max-xl:w-full">
                        <Link href="/billing/finances" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer">{lang?.finances}</Link>
                        <Link href="/billing/subscriptions" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer bg-slate-100 font-medium border-l-2 border-primary">{lang?.subscriptions}</Link>
                    </div>
                    <div className="flex flex-col w-[calc(100%_-_232px)] max-xl:w-full">
                      
                        <div className="border rounded-md flex flex-col mt-4">
                            <div className="p-8 max-lg:p-4">
                                <b>{lang?.subscriptions}</b>
                                <p className="mt-2 mb-4">{lang?.subscriptions_desc}</p>
                            </div>

                            <div className="flex flex-col w-full">
                              <div className="flex w-full border-b bg-slate-100 max-lg:hidden">
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">{lang?.date_from}</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">{lang?.date_to}</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">{lang?.amount}</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">{lang?.active}</div>
                              </div>
                              {sub?.map((el:any) => 
                                <div key={el.id} className="flex w-full border-b max-lg:hidden">
                                  <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">{new Date(el.start_date).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  })}</div>
                                  <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">{new Date(el.end_date).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  })}</div>
                                  <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">{el.cost}</div>
                                  <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">{el.is_active? "Active" : "No active"}</div>
                                </div>
                              )}

                              {sub?.map((el:any) => 
                                <div key={el.id} className="w-full p-4 hidden max-lg:flex flex-col border-t">
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] max-sm:text-sm font-bold">{lang?.date_from}</div>
                                    <div className="max-sm:text-sm">{new Date(el.start_date).toLocaleString('ru', {
                                      year: 'numeric',
                                      month: 'numeric',
                                      day: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric',
                                    })}
                                    </div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] max-sm:text-sm font-bold">{lang?.date_to}</div>
                                    <div className="max-sm:text-sm">{new Date(el.end_date).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  })}</div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] max-sm:text-sm font-bold">{lang?.amount}</div>
                                    <div className="max-sm:text-sm">{el.cost} $</div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] max-sm:text-sm font-bold">{lang?.active}</div>
                                    <div className="max-sm:text-sm">{el.is_active? lang?.active : lang?.no_active}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                        </div>
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
