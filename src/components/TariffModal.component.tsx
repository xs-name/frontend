'use client';

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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useUserContext } from "./userProvider";
import { useLanguageContext } from "./LanguageProvider";
import { getUser } from "@/lib/user";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { config } from "@/lib/utils";
import Link from "next/link";

export const TariffModal = ({active, setActive}: any) => {

    const {user, setUser} = useUserContext();
    const { language, setLanguage } = useLanguageContext();
    const [lang, setLang] = useState<any>();

    const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false)
  const [lvlSub, setLvlSub] = useState(0)
  const [type, setType] = useState<any>(null);
  const [tariffName, setTariffName] = useState("");
  const [duration, setDuration] = useState("90")

  const [tariff, setTariff] = useState([])

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
    }).then(() => {
      getTariffs()
    })
  }, [])

  function getTariffs(){
    axios.get(process.env.NEXT_PUBLIC_API + '/account/subscriptions/available').then((res: any) => {
      let tariffs = res.data.result
      tariffs = tariffs.sort((a: any, b: any) => Number(a.price) > Number(b.price) ? 1 : -1)
      setTariff(tariffs)
    })
  }

  useEffect(() => {
    tariff.map((el: any) => {
      if((el.title).toLowerCase() == (user?.subscribe?.name)?.toLowerCase()){
        setLvlSub(el.id)
      }
    })
  }, [user, tariff])

  useEffect(() => {
    tariff.map((el: any) => {
      if((el.title).toLowerCase() == (user?.subscribe?.name)?.toLowerCase()){
        setLvlSub(el.id)
      }
    })
  }, [])

  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.tariffs);
        })
        .finally(() => setLoading(false));
    }
  }, [language]);

  function buy(){
    if(type == 1){
      //Продлить
      axios.patch(process.env.NEXT_PUBLIC_API + '/account/subscriptions/extend', {duration: Number(duration)}, config).then((res: any) => {
        if(res.data.error.length == 0){
          toast("Успех!", {
            description: "Подписка успешно продлена!"
          })
          setLoadingData(false)
          setModal(false)
        } else {
          toast(lang?.error, {
            description: res.data.error[0].message
          })
          setLoadingData(false)
        }
      }).then(() => {
        getUser().then(res => {
          if(res.length != 0){
            setLanguage(res.language)
          } else {
            setLanguage('en')
          }
          setUser(res)
        }).then(() => {
          getTariffs()
        })
      })
    } else{
      //Купить
      axios.post(process.env.NEXT_PUBLIC_API + '/account/subscriptions/buy', {duration: Number(duration), group_name: tariffName.toLowerCase()}, config).then((res: any) => {
        if(res.data.error.length == 0){
          toast("Успех!", {
            description: "Подписка успешно куплена!"
          })
          setLoadingData(false)
          setModal(false)
        } else {
          toast(lang?.error, {
            description: res.data.error[0].message
          })
          setLoadingData(false)
        }
      }).then(() => {
        getUser().then(res => {
          if(res.length != 0){
            setLanguage(res.language)
          } else {
            setLanguage('en')
          }
          setUser(res)
        }).then(() => {
          getTariffs()
        })
      })
    }
    setActive(false)
  }

    return(
        <div className="">
            <Toaster />
            <AlertDialog open={modal} onOpenChange={setModal}>
                <AlertDialogTrigger>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{type == 1? lang?.prolong : lang?.select} {lang?.tariff} {tariffName}</AlertDialogTitle>
                    <AlertDialogDescription>
                    {lang?.chooce} {type == 1? lang?.buy : lang?.prolong_min} {lang?.tariff}.
                    </AlertDialogDescription>
                    <Select value={duration} onValueChange={(value) => setDuration(value)}>
                    <SelectTrigger className="w-full mt-1" defaultValue="1.0">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="30">{lang?.month_1}</SelectItem>
                        <SelectItem value="60">{lang?.month_2}</SelectItem>
                        <SelectItem value="90">{lang?.month_3}</SelectItem>
                        <SelectItem value="180">{lang?.month_6}</SelectItem>
                        <SelectItem value="240">{lang?.month_8}</SelectItem>
                        <SelectItem value="300">{lang?.month_10}</SelectItem>
                        <SelectItem value="360">{lang?.month_12}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loadingData}>{lang?.cancel}</AlertDialogCancel>
                    <Button disabled={loadingData} onClick={() => {
                    setLoadingData(true)
                    buy()
                    }} >{loadingData ? <Loader2 className="animate-spin w-5 h-5"/> : lang?.continue}</Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={active} onOpenChange={setActive}>
                <AlertDialogTrigger>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{lang?.enough}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {lang?.enough_desc}
                            <div className="mt-3">
                              {tariff.map((item: any) => 
                                item.id == (lvlSub + 1) ?
                                  <div key={item.id} className="flex flex-col bg-primary pt-5 pb-5 pr-8 pl-8 rounded-3xl mb-3">
                                      <div className="flex justify-end"><div className="bg-blue-500 text-xs font-bold text-white pt-[2px] pb-[2px] pr-4 pl-4 rounded-md">{lang?.popular}</div></div>
                                      <div className="text-4xl font-bold text-white text-left">${(Number(item.price) - ((Number(item.price) / 100) * Number(item.discount))).toFixed(0)}{Number(item.discount) > 0 ? <span className="text-xl line-through ml-1">${Number(item.price).toFixed(0)}</span> : null} <span className="text-lg font-normal text-slate-400">/{lang?.month}</span></div>
                                      <div className="text-2xl mt-5 mb-3 text-white text-left">{item.title}</div>

                                      {item.permissions?.map((plus: any) =>
                                          
                                          plus.permission == "zones:create" || plus.permission == "cf-accounts:import" ?
                                              <div key={plus.permission} className="flex gap-1 mb-3 items-start text-white leading-5 text-left">
                                                  <div className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full"><Check className="w-3 h-3"/></div>
                                                  <span className="w-[calc(100%-24px)]">
                                                  {plus.permission == "zones:create" ? `${lang?.create_1} ${plus.limit.count} ${lang?.create_2}` : null}
                                                  {plus.permission == "cf-accounts:import" ? `${lang?.import_1} ${plus.limit.count} ${lang?.import_2}` : null}
                                                  </span>
                                              </div>
                                              :
                                              null
                                      )}

                                      <Button disabled={lvlSub > item.id} variant="secondary" onClick={() => {
                                      if(user?.subscribe?.name[0].toUpperCase() + user?.subscribe?.name.slice(1)  == item.title){
                                        setType(1)
                                      } else {
                                        setType(2)
                                      }
                                      setTariffName(item.title)
                                      setModal(true)
                                      }} className="w-full mt-3">{user?.subscribe?.name[0].toUpperCase() + user?.subscribe?.name.slice(1)  == item.title? lang?.prolong : lang?.select}</Button>

                                  </div>
                                  :
                                  null
                              )}
                            </div>
                    </AlertDialogDescription>
                    
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{lang?.cancel}</AlertDialogCancel>
                    <Link href="/tariffs"><Button className="max-sm:w-full">{lang?.all_tarrifs}</Button></Link>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}