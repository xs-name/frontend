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
import { ChevronRight, Loader2, MoveLeft } from "lucide-react";
import { getLanguage } from "@/lib/language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

import { config, headers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SSL() {

  const {user, setUser} = useUserContext();
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [pay, setPay] = useState<any>([])

  const [sum, setSum] = useState<any>(0)
  const [modal, setModal] = useState(false)
  const [loadingPay, setLoadingPay] = useState(false)

  const router = useRouter()

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
      getPay()
    })
  }, [])

  function getPay() {
    axios.get(process.env.NEXT_PUBLIC_API + '/account/payments', config).then((res: any) => {
      console.log(res.data)
      if(res.data.error.length == 0){
        let pay = res.data.result[0].data
        pay = pay.sort((a: any, b: any) => new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1)
        console.log(pay)
        setPay(pay)
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

  function payCreate(){
    if(sum > 0){
      axios.post(process.env.NEXT_PUBLIC_API + "/account/payments/cryptomus/create", {amount: Number(sum)}, config).then((res) => {
        if(res.data.error.length == 0){
          router.push(`https://pay.cryptomus.com/pay/${res.data.result[0].payment_id}`)
          setLoadingPay(false)
        } else {
          toast("Произошла ошибка", {
            description: res.data.error[0].message
          })
          setLoadingPay(false)
        }
      })
    } else{
      toast("Ошибка!", {
        description: "Amount не может быть меньше 0"
      })
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {user.length != 0? (
        <>
        <Nav />
          <Toaster />
          <Dialog open={modal} onOpenChange={setModal}>
              <DialogTrigger>
              </DialogTrigger>
              <DialogContent className="w-[425px] max-h-dvh lg:max-w-screen-lg">
                <DialogHeader>
                  <DialogTitle>Replenishment of the balance</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <div className='w-full mb-4'>
                    <Label className="text-xs text-muted-foreground mt-1">Amount</Label>
                    <Input type="number" min={0} value={sum} onChange={(e) => setSum(e.target.value)} />
                  </div>

                  <Button onClick={() => {
                    setLoadingPay(true)
                    payCreate()
                  }} disabled={loadingPay} className='w-full mt-2' variant='secondary'> {loadingPay? <div className="flex items-center gap-1"><Loader2 className="animate-spin w-4 h-4"/> Загрузка</div> : "Pay with cryptocurrency"}</Button>
                </DialogDescription>
              </DialogContent>
          </Dialog>
          
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Billing</h1>
              <p className="leading-7 mb-5">
                Customize your edge certificates, which encrypt traffic.
              </p>

                <div className="flex gap-8 max-xl:flex-col">
                    <div className="flex flex-col w-[200px] max-xl:w-full">
                      <Link href="/billing/finances" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer bg-slate-100 font-medium border-l-2 border-primary">Finances</Link>
                      <Link href="/billing/subscriptions" className="h-10 pl-4 flex items-center hover:text-primary cursor-pointer">Subscriptions</Link>
                    </div>
                    <div className="flex flex-col w-[calc(100%_-_232px)] max-xl:w-full">
                        <div className="border rounded-md flex max-lg:flex-col-reverse">
                            <div className="p-8 max-lg:p-4 w-1/2 max-lg:w-full">
                              <b>Current balance</b>
                              <p className="mt-4 mb-4">You can top up your balance with various cryptocurrencies.</p>
                              <Button onClick={() => setModal(true)}>Top up balance</Button>
                            </div>
                            <div className="bg-slate-100 w-1/2 max-lg:w-full max-lg:h-[100px] flex items-center justify-center">
                              <div className="text-xl font-bold">$ {user?.balance}</div>
                            </div>
                        </div>

                        <div className="border rounded-md flex flex-col mt-4">
                            <div className="p-8 max-lg:p-4">
                                <b>Current balance</b>
                                <p className="mt-2 mb-4">Here are displayed all your top-ups and expenses, except for subscriptions.</p>
                            </div>

                            <div className="flex flex-col w-full">
                              <div className="flex w-full border-b bg-slate-100 max-lg:hidden">
                                <div className="w-[25%] pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Date</div>
                                <div className="w-[25%] pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Payer currency</div>
                                <div className="w-[20%] pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Amount</div>
                                <div className="w-[15%] pt-2 pb-2 pr-4 font-semibold text-sm pl-4">Status</div>
                                <div className="w-[15%] pt-2 pb-2 pr-4 font-semibold text-sm pl-4 flex justify-end text-sm">Payment</div>
                              </div>
                              {pay?.map((el:any) => 
                                <div key={el.id} className="w-full flex border-b max-lg:hidden">
                                  <div className="w-[25%] pb-2 pt-2 pl-4 pr-4 text-sm">{new Date(el.created_at).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                  })}</div>
                                  <div className="w-[25%] pb-2 pt-2 pl-4 pr-4 text-sm">{el.payer_currency == null ? "NULL" : el.payer_currency}</div>
                                  <div className="w-[20%] pb-2 pt-2 pl-4 pr-4 text-sm">{Number(el.amount).toFixed(2)} $</div>
                                  <div className="w-[15%] pb-2 pt-2 pl-4 pr-4 text-sm">{el?.status}</div>
                                  <div className="w-[15%] pb-2 pt-2 pl-4 pr-4 text-smflex justify-end text-sm flex "><Link href={`https://pay.cryptomus.com/pay/${el.payment_id}`} className="cursor-pointer flex text-primary items-center">To pay <ChevronRight className={"w-4 transition-all h-[16px]"}/></Link></div>
                                </div>
                              )}

                              {pay?.map((el:any) => 
                                <div key={el.id} className="w-full p-4 hidden max-lg:flex flex-col border-t">
                                  <div className="flex items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] text-sm font-bold">Date</div>
                                    <div className="text-sm">{new Date(el.created_at).toLocaleString('ru',
                                      {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                      })}
                                    </div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] text-sm font-bold">Payer currency</div>
                                    <div className="text-sm">{el.payer_currency == null ? "NULL" : el.payer_currency}</div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] text-sm font-bold">Amount</div>
                                    <div className="text-sm">{Number(el.amount).toFixed(2)} $</div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] text-sm font-bold">Status</div>
                                    <div className="text-sm">{el?.status}</div>
                                  </div>
                                  <div className="flex pb-2 pt-2 items-center w-full">
                                    <div className="w-[40%] max-sm:w-[50%] text-sm font-bold">Payment</div>
                                    <div><Link href={`https://pay.cryptomus.com/pay/${el.payment_id}`} className="cursor-pointer flex text-primary items-center text-sm">To pay <ChevronRight className={"w-4 transition-all h-[16px]"}/></Link></div>
                                  </div>
                                </div>
                              )}
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
          </div>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
