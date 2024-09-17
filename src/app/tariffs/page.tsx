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
import { Check, Loader2, MoveLeft } from "lucide-react";
import { getLanguage } from "@/lib/language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch";

import { headers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";

export default function Tariffs() {

  const {user, setUser} = useUserContext();
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [tariff, setTariff] = useState([])

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
    })
    getTariffs()
  }, [])

  function getTariffs(){
    axios.get(process.env.NEXT_PUBLIC_API + '/account/subscriptions/available').then((res: any) => {
      let tariffs = res.data.result
      tariffs = tariffs.sort((a: any, b: any) => Number(a.price) > Number(b.price) ? 1 : -1)
      setTariff(tariffs)
    })
  }

  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.ssl);
        })
        .finally(() => setLoading(false));
    }
  }, [language]);


  if (loading) {
    return <Loading />;
  }


  return (
    <main>
      {user.length != 0 ? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Tariffs</h1>
              <p className="leading-7 mb-5">
                tariffs_description
              </p>

              <div className="mt-20 max-lg:mt-8">
                {tariff.map((item: any) => 
                  item.title == "Business" ? 
                  <div key={item.id} className="hidden max-xl:flex flex-col bg-primary pt-5 pb-5 pr-8 pl-8 rounded-3xl mb-3">
                    <div className="flex justify-end"><div className="bg-blue-500 text-xs font-bold text-white pt-[2px] pb-[2px] pr-4 pl-4 rounded-md">MOST POPULAR</div></div>
                    <div className="text-4xl font-bold text-white">${(Number(item.price) - ((Number(item.price) / 100) * Number(item.discount))).toFixed(0)}{Number(item.discount) > 0 ? <span className="text-xl line-through ml-1">${Number(item.price).toFixed(0)}</span> : null} <span className="text-lg font-normal text-slate-400">/month</span></div>
                    <div className="text-2xl mt-5 mb-3 text-white">{item.title}</div>

                    {item.permissions?.map((plus: any) =>
                      <div key={plus.permission} className="flex gap-1 mb-3 items-start text-white leading-5"><div className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full"><Check className="w-3 h-3"/></div>
                        <span className="w-[calc(100%-24px)]">
                          {plus.permission == "zones:create" ? `Создание ${plus.limit.count} зон раз в 24 часа` : null}
                          {plus.permission == "cf-accounts:import" ? `Импорт ${plus.limit.count} аккаунтов раз в 24 часа` : null}
                        </span>
                      </div>
                    )}

                    <Button variant="secondary" className="w-full mt-3">Выбрать</Button>

                  </div>
                  :
                  null
                )}
                <div className="flex justify-evenly pt-10 pb-10 h-full w-[930px] bg-slate-50 rounded-3xl max-xl:w-full max-xl:pt-5 max-xl:pb-5 max-lg:flex-col max-lg:bg-transparent max-lg:gap-8">
                  {tariff.map((item: any) => 
                    <div className={item.title == "Business" ? "relative w-[300px] max-xl:hidden" : "w-[235px] max-xl:w-1/2 max-lg:w-full max-lg:bg-slate-50 max-lg:rounded-3xl"} key={item.title}>
                      <div className={item.title == "Business" ? "absolute top-[-65px] bg-primary w-[300px] rounded-3xl pt-5 pb-5 pr-8 pl-8" : "w-[235px] max-xl:w-full max-xl:p-5"}>
                        {item.title == "Business" ? <div className="flex justify-end mb-6"><div className="bg-blue-500 text-xs font-bold text-white pt-[2px] pb-[2px] pr-4 pl-4 rounded-md">MOST POPULAR</div></div> : null}
                        <div className={item.title == "Business" ? "text-4xl font-bold text-white" : "text-4xl font-bold"}>${(Number(item.price) - ((Number(item.price) / 100) * Number(item.discount))).toFixed(0)}{Number(item.discount) > 0 ? <span className="text-xl line-through ml-1">${Number(item.price).toFixed(0)}</span> : null} <span className="text-lg font-normal text-slate-400">/month</span></div>
                        <div className={item.title == "Business" ? "text-2xl mt-5 mb-3 text-white" : "text-2xl mb-3 mt-5"}>{item.title}</div>
                        <div className="mt-2">
                          {item.permissions?.map((plus: any) =>
                            <div key={plus.permission} className={item.title == "Business"? "flex gap-1 mb-3 items-start text-white leading-5" : "leading-5 flex gap-1 mb-3 items-start"}><div className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full"><Check className="w-3 h-3"/></div>
                              <span className="w-[calc(100%-24px)]">
                                {plus.permission == "zones:create" ? `Создание ${plus.limit.count} зон раз в 24 часа` : null}
                                {plus.permission == "cf-accounts:import" ? `Импорт ${plus.limit.count} аккаунтов раз в 24 часа` : null}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button variant={item.title == "Business" ? "secondary" : "default"} className="w-full mt-3">Выбрать</Button>
                      </div>
                    </div>
                  )}
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
