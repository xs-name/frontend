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
        console.log(res.data.result)
        setSub(res.data.result)
      }
    })
  }


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
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Billing</h1>
              <p className="leading-7 mb-5">
                Customize your edge certificates, which encrypt traffic.
              </p>

                <div className="flex gap-8">
                    <div className="flex flex-col w-[200px]">
                        <Link href="/billing/finances" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer">Finances</Link>
                        <Link href="/billing/subscriptions" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer bg-slate-100 font-medium border-l-2 border-primary">Subscriptions</Link>
                    </div>
                    <div className="flex flex-col w-[calc(100%_-_232px)]">
                      
                        <div className="border rounded-md flex flex-col mt-4">
                            <div className="p-8 ">
                                <b>Subscriptions</b>
                                <p className="mt-2 mb-4">Here are displayed all your top-ups and expenses, except for subscriptions.</p>
                            </div>

                            <div className="flex flex-col w-full">
                              <div className="flex w-full border-b bg-slate-100 max-lg:hidden">
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Date from</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Date to</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Amount</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Active</div>
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
                                  {/* <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">???</div> */}
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
