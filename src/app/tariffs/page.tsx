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

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
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
      console.log(res.data.result)
      setTariff(res.data.result)
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
      {isAuthorized ? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Billing</h1>
              <p className="leading-7 mb-5">
                Customize your edge certificates, which encrypt traffic.
              </p>

              <div className="mt-20">
                <div className="flex justify-evenly pt-10 pb-10 h-full w-[930px] bg-slate-50 rounded-3xl">
                  {tariff.map((item: any) => 
                    <div className={item.title == "Business" ? "relative w-[300px]" : "w-[235px]"} key={item.title}>
                      <div className={item.title == "Business" ? "absolute top-[-65px] bg-primary w-[300px] rounded-3xl pt-5 pb-5 pr-8 pl-8" : "w-[235px]"}>
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
