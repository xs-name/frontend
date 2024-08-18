/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import AuthPage from "@/components/AuthPage.component";
import { useLanguageContext } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Loading } from "@/components/Loading.components";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation'
import { MoveLeft, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { getLanguage } from "@/lib/language";
import { DnsTable } from "@/components/dnsTable.components";
import { DnsTableRow } from "@/components/dnsTableRow.components";


export default function Home({params}:any) {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)

  const [dataTable, setDataTable] = useState({
    type: "A",
    name: "",
    TTL: "",
    proxyStatus: "",
    types: {
      A: {
        address: ""
      },
      CAA: {
        flags: 0,
        tag: "1",
        domain_name: "",
      },
      CERT: {
        cert: "",
        key_tag: "",
        algorithm: "",
        certificate: ""
      },
      CNAME: {
        target: ""
      },
      DNSKEY: {
        flags: "",
        protocol: "3 - DNSSEC",
        algorithm: "",
        public_key: ""
      },
      DS: {
        key_tag: "",
        algorithm: "",
        digest_type: "",
        digest: ""
      },
      HTTPS: {
        priority: "",
        target: "", 
        value: ""
      },
      LOC: {
        latitude_degrees: "",
        latitude_minutes: "",
        latitude_seconds: "",
        latitude_direction: "N",
        longitude_degrees: "",
        longitude_minutes: "",
        longitude_seconds: "",
        longitude_direction: "E",
        horizontal: "",
        vertical: "",
        altitude: "",
        size: ""
      },
      MX: {
        mail: "",
        priority: ""
      },
      NAPTR: {
        order: "",
        preference: "",
        flags: "",
        service: "",
        regEx: "",
        replacement: ""
      },
      NS: {
        nameserver: ""
      },
      PTR: {
        domain: ""
      },
      SMIMEA: {
        usage: "",
        selector: "",
        matching_type: "",
        certificate: ""
      },
      SRV: {
        priority: "",
        weight: "",
        port: "",
        target: ""
      },
      SSHFP: {
        algorithm: "",
        type: "",
        fingerprint: ""
      },
      SVCB: {
        priority: "",
        target: "",
        value: ""
      },
      TLSA: {
        usage: "",
        selector: "",
        matching_type: "",
        certificate: ""
      },
      TXT: {
        сontent: "",
      },
      URI: {
        priority: "",
        weight: "",
        target: ""
      }
    }
  });

  const [data, setData] = useState({
    type: "A",
    name: "idenstore.ru",
    content: "65.109.4.197",
    proxyStatus: true,
    TTL: "Auto"
  });


  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.add)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  if(loading){
    return <Loading />
  }

  if(!params.account || !params.id){
    return notFound()
  }

  return (
    <main>
      {isAuthorized?
      <div>
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">wanddecisions.com</h1>
            <p className="leading-7">Управляйте DNS-записями вашего домена.</p>
            <Link className="font-medium text-primary text-sm flex gap-1 items-center mt-2 hover:text-primary/80" href={"/"}><MoveLeft className="h-4"/>Назад к веб-сайтам</Link>
            
            <div className="flex flex-col border rounded-md w-full mt-8">
              <div className="flex flex-col p-5 w-full items-start mb-6">
                <b className="text-xl font-semibold">Менеджер DNS</b>
                <p className="text-sm mt-[5px]">Просмотр, добавление и редактирование записей DNS. Изменения вступят в силу после сохранения.</p>
                <Button className="mt-5" onClick={() => setIsEditing(!isEditing)}><Plus className="h-4 mr-1"/>Добавить запись</Button>
              </div>

              {isEditing?
                <>
                  <div className="border-t">
                    <DnsTable data={dataTable} setData={setDataTable}/>
                  </div>
                  <div className="flex flex-col border-t p-5">
                    <div className="flex gap-2 justify-end">
                    <Button className="" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button className="">Save</Button>
                    </div>
                  </div>
                </>
              : null
              }

              <div className="flex flex-col w-full">
                <div className="flex w-full border-b bg-slate-100">
                  <div className="w-[12px]"></div>
                  <div className="w-[14%] pl-2 pt-2 pb-2 pr-4 font-semibold">Type</div>
                  <div className="w-[23%] pl-2 pt-2 pb-2 pr-4 font-semibold">Name</div>
                  <div className="w-[29%] pl-2 pt-2 pb-2 pr-4 font-semibold">Content</div>
                  <div className="w-[22%] pl-2 pt-2 pb-2 pr-4 font-semibold">Proxy status</div>
                  <div className="w-[12%] pl-2 pt-2 pb-2 pr-4 font-semibold">TTL</div>
                  <div className="w-[12.5%] pl-2 pt-2 pb-2 pr-4 font-semibold flex justify-end">Actions</div>
                </div>
                <div>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  <DnsTableRow data={data} setData={setData}/>
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
