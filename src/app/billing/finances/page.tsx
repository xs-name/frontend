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

import { headers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";

export default function SSL() {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {user, setUser} = useUserContext();
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [pay, setPay] = useState([])

  useEffect(() => {
    getUser().then(res => {
      setUser(res)
      getPay()
    })
  }, [])

  function getPay() {
    axios.get(process.env.NEXT_PUBLIC_API + '/account/payments', {headers: headers}).then((res: any) => {
      console.log(res.data)
      setPay(res.data)
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
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Billing</h1>
              <p className="leading-7 mb-5">
                Customize your edge certificates, which encrypt traffic.
              </p>

                <div className="flex gap-8">
                    <div className="flex flex-col w-[200px]">
                        <Link href="/billing/finances" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer bg-slate-100 font-medium border-l-2 border-primary">Finances</Link>
                        <Link href="/billing/subscriptions" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer">Subscriptions</Link>
                    </div>
                    <div className="flex flex-col w-[calc(100%_-_232px)]">
                        <div className="border rounded-md flex">
                            <div className="p-8 w-1/2">
                                <b>Current balance</b>
                                <p className="mt-4 mb-4">You can top up your balance with various cryptocurrencies.</p>
                                <Button>Top up balance</Button>
                            </div>
                            <div className="bg-slate-100 w-1/2 flex items-center justify-center">
                                <div className="text-xl font-bold">$ 155.3</div>
                            </div>
                        </div>

                        <div className="border rounded-md flex flex-col mt-4">
                            <div className="p-8 ">
                                <b>Current balance</b>
                                <p className="mt-2 mb-4">Here are displayed all your top-ups and expenses, except for subscriptions.</p>
                            </div>

                            <div className="flex flex-col w-full">
                              <div className="flex w-full border-b bg-slate-100 max-lg:hidden">
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Date</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Description</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Type</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Amount</div>
                                <div className="w-full pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Status</div>
                              </div>
                              <div className="flex w-full border-b max-lg:hidden">
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                              </div>
                              <div className="flex w-full border-b max-lg:hidden">
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                              </div>
                              <div className="flex w-full border-b max-lg:hidden">
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                                <div className="w-full pb-2 pt-2 pl-4 pr-4 text-sm">2024-01-01</div>
                              </div>
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
