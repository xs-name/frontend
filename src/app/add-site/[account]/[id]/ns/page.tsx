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
import { notFound, useRouter } from 'next/navigation'
import { Copy, MoveLeft, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

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
import { config, headers } from "@/lib/utils";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";


export default function Home({params}:any) {

  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState<any>([]);
  const [DNS, setDNS] = useState<any>([]);

  const router = useRouter()

  useEffect(() => {
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
    })
  }, [])

  const [dataTable, setDataTable] = useState({
    type: "A",
    name: "",
    TTL: "1",
    domain: "",
    proxyStatus: true,
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
        protocol: 3,
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

  const [isEditing, setIsEditing] = useState(true);

  function getDNS(){
    axios.get(process.env.NEXT_PUBLIC_API + `/zones/dns/${params.account}/${params.id}`, config).then((res:any) => {
      if(!res.data.error?.length){
        setDNS(res.data.result[0])
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    })
  }

  function deleteDNS(id: string){
    const data = {
      id: id
    }

    const newConfig: any = config;
    newConfig.data = data

    axios.delete(process.env.NEXT_PUBLIC_API + `/zones/dns/${params.account}/${params.id}`, newConfig).then((res:any) => {
      // console.log(res.data)
      if(!res.data.error?.length){
        getDNS()
      }else{
        toast(lang?.error, {
          description: res.data.error[0].message,
        })
      }
    })
  }

  function updateDNS(id: string, dataTable: any, type: string, setActive: any){
    let data: any = {}

    switch(dataTable.type){
      case "A":
        data = {
          type: dataTable.type,
          name: dataTable.name == "@" ? domain.name : dataTable.name,
          content: dataTable.types.A.address,
          proxied: dataTable.proxyStatus,
          ttl: Number(dataTable.TTL)
        }
        break;
      case "AAAA":
        data = {
          type: dataTable.type,
          name: dataTable.name == "@" ? domain.name : dataTable.name,
          content: dataTable.types.A.address,
          proxied: dataTable.proxyStatus,
          ttl: Number(dataTable.TTL)
        }
        break
      case "CAA":
        data = {
          type: dataTable.type,
          name: dataTable.name == "@" ? domain.name : dataTable.name,
          // content: dataTable.types.A.address,
          // proxied: dataTable.proxyStatus,
          ttl: Number(dataTable.TTL),
          data: {
            flags: dataTable.types.CAA.flags,
            tag: dataTable.types.CAA.tag,
            value: dataTable.types.CAA.domain_name
          }
        }
        break
        case "CERT":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.A.address,
            // proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.CERT.algorithm,
              certificate: dataTable.types.CERT.certificate,
              key_tag: dataTable.types.CERT.key_tag,
              type: dataTable.types.CERT.cert
            }
          }
        break;
        case "CNAME":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.CNAME.target,
            proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
          }
        break;
        case "DNSKEY":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.DNSKEY.algorithm,
              flags: dataTable.types.DNSKEY.flags,
              protocol: dataTable.types.DNSKEY.protocol,
              public_key: dataTable.types.DNSKEY.public_key
            }
          }
        break;
        case "DS":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.DS.algorithm,
              digest: dataTable.types.DS.digest,
              digest_type: dataTable.types.DS.digest_type,
              key_tag: dataTable.types.DS.key_tag
            }
          }
        break;
        case "HTTPS":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.CNAME.target,
            // proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
            data: {
              priority: dataTable.types.HTTPS.priority,
              target: dataTable.types.HTTPS.target,
              value: dataTable.types.HTTPS.value
            }
          }
        break;
        case "LOC":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.CNAME.target,
            // proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
            data: {
              altitude: dataTable.types.LOC.altitude,
              lat_degrees: dataTable.types.LOC.latitude_degrees,
              lat_direction: dataTable.types.LOC.latitude_direction,
              lat_minutes: dataTable.types.LOC.latitude_minutes,
              lat_seconds: dataTable.types.LOC.latitude_seconds,
              long_degrees: dataTable.types.LOC.longitude_degrees,
              long_direction: dataTable.types.LOC.longitude_direction,
              long_minutes: dataTable.types.LOC.longitude_minutes,
              long_seconds: dataTable.types.LOC.longitude_seconds,
              precision_horz: dataTable.types.LOC.horizontal,
              precision_vert: dataTable.types.LOC.vertical,
              size: dataTable.types.LOC.size
            }
          }
        break;
        case "MX":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.MX.mail,
            priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
          }
        break;
        case "NAPTR":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.MX.mail,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              flags: dataTable.types.NAPTR.flags,
              order: dataTable.types.NAPTR.order,
              preference: dataTable.types.NAPTR.preference,
              regex: dataTable.types.NAPTR.regEx,
              replacement: dataTable.types.NAPTR.replacement,
              service: dataTable.types.NAPTR.service
            }
          }
        break;
        case "NS":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.NS.nameserver,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL)
          }
        break;
        case "PTR":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.PTR.domain,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL)
          }
        break;
        case "SMIMEA":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              certificate: dataTable.types.SMIMEA.certificate,
              matching_type: dataTable.types.SMIMEA.matching_type,
              selector: dataTable.types.SMIMEA.selector,
              usage: dataTable.types.SMIMEA.usage
            }
          }
        break;
        case "SRV":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              name: domain.name,
              port: dataTable.types.SRV.port,
              priority: dataTable.types.SRV.priority,
              // proto: dataTable.types.SRV.p
              // service: dataTable.types.SRV.
              target: dataTable.types.SRV.target,
              weight: dataTable.types.SRV.weight
            }
          }
        break;
        case "SSHFP":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.SSHFP.algorithm,
              fingerprint: dataTable.types.SSHFP.fingerprint,
              type: dataTable.types.SSHFP.type
            }
          }
        break;
        case "SVCB":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              priority: dataTable.types.SVCB.priority,
              target: dataTable.types.SVCB.target,
              value: dataTable.types.SVCB.value
            }
          }
        break;
        case "TLSA":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              certificate: dataTable.types.TLSA.certificate,
              matching_type: dataTable.types.TLSA.matching_type,
              selector: dataTable.types.TLSA.selector,
              usage: dataTable.types.TLSA.usage
            }
          }
        break;
        case "TXT":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.TXT.сontent,
            ttl: Number(dataTable.TTL)
          }
        break;
        case "URI":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            priority: Number(dataTable.types.URI.priority),
            ttl: Number(dataTable.TTL),
            data: {
              target: dataTable.types.URI.target,
              weight: dataTable.types.URI.weight
            }
          }
        break;
    }

    data.id = id

    axios.patch(process.env.NEXT_PUBLIC_API + `/zones/dns/${params.account}/${params.id}`, data, config).then((res:any) => {
      // console.log(res.data)
      if(!res.data.error?.length){
        getDNS()
        setActive(false)
      }else{
        toast(lang?.error, {
          description: res.data.error[0].message,
        })
      }
    })
  }


  useEffect(() => {
    if(params.account && params.id){
      axios.get(process.env.NEXT_PUBLIC_API + `/zones/${params.account}/${params.id}`, config).then((res:any) => {
        if(!res.data.error?.length){
          setDataTable({...dataTable, domain: res.data.result?.name})
          setDomain(res.data.result)
          // console.log('domain', res.data.result)
        }else{
          //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
        }
      })

      getDNS()
    }
  }, [])

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.add)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])


  function addDNS(){
    let data: any = {}
    switch(dataTable.type){
      case "A":
        data = {
          type: dataTable.type,
          name: dataTable.name == "@" ? domain.name : dataTable.name,
          content: dataTable.types.A.address,
          proxied: dataTable.proxyStatus,
          ttl: Number(dataTable.TTL)
        }
        break;
      case "AAAA":
        data = {
          type: dataTable.type,
          name: dataTable.name == "@" ? domain.name : dataTable.name,
          content: dataTable.types.A.address,
          proxied: dataTable.proxyStatus,
          ttl: Number(dataTable.TTL)
        }
        break
      case "CAA":
        data = {
          type: dataTable.type,
          name: dataTable.name == "@" ? domain.name : dataTable.name,
          // content: dataTable.types.A.address,
          // proxied: dataTable.proxyStatus,
          ttl: Number(dataTable.TTL),
          data: {
            flags: dataTable.types.CAA.flags,
            tag: dataTable.types.CAA.tag,
            value: dataTable.types.CAA.domain_name
          }
        }
        break
        case "CERT":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.A.address,
            // proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.CERT.algorithm,
              certificate: dataTable.types.CERT.certificate,
              key_tag: dataTable.types.CERT.key_tag,
              type: dataTable.types.CERT.cert
            }
          }
        break;
        case "CNAME":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.CNAME.target,
            proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
          }
        break;
        case "DNSKEY":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.DNSKEY.algorithm,
              flags: dataTable.types.DNSKEY.flags,
              protocol: dataTable.types.DNSKEY.protocol,
              public_key: dataTable.types.DNSKEY.public_key
            }
          }
        break;
        case "DS":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.DS.algorithm,
              digest: dataTable.types.DS.digest,
              digest_type: dataTable.types.DS.digest_type,
              key_tag: dataTable.types.DS.key_tag
            }
          }
        break;
        case "HTTPS":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.CNAME.target,
            // proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
            data: {
              priority: dataTable.types.HTTPS.priority,
              target: dataTable.types.HTTPS.target,
              value: dataTable.types.HTTPS.value
            }
          }
        break;
        case "LOC":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.CNAME.target,
            // proxied: dataTable.proxyStatus,
            ttl: Number(dataTable.TTL),
            data: {
              altitude: dataTable.types.LOC.altitude,
              lat_degrees: dataTable.types.LOC.latitude_degrees,
              lat_direction: dataTable.types.LOC.latitude_direction,
              lat_minutes: dataTable.types.LOC.latitude_minutes,
              lat_seconds: dataTable.types.LOC.latitude_seconds,
              long_degrees: dataTable.types.LOC.longitude_degrees,
              long_direction: dataTable.types.LOC.longitude_direction,
              long_minutes: dataTable.types.LOC.longitude_minutes,
              long_seconds: dataTable.types.LOC.longitude_seconds,
              precision_horz: dataTable.types.LOC.horizontal,
              precision_vert: dataTable.types.LOC.vertical,
              size: dataTable.types.LOC.size
            }
          }
        break;
        case "MX":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.MX.mail,
            priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
          }
        break;
        case "NAPTR":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.MX.mail,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              flags: dataTable.types.NAPTR.flags,
              order: dataTable.types.NAPTR.order,
              preference: dataTable.types.NAPTR.preference,
              regex: dataTable.types.NAPTR.regEx,
              replacement: dataTable.types.NAPTR.replacement,
              service: dataTable.types.NAPTR.service
            }
          }
        break;
        case "NS":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.NS.nameserver,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL)
          }
        break;
        case "PTR":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.PTR.domain,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL)
          }
        break;
        case "SMIMEA":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              certificate: dataTable.types.SMIMEA.certificate,
              matching_type: dataTable.types.SMIMEA.matching_type,
              selector: dataTable.types.SMIMEA.selector,
              usage: dataTable.types.SMIMEA.usage
            }
          }
        break;
        case "SRV":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              name: domain.name,
              port: dataTable.types.SRV.port,
              priority: dataTable.types.SRV.priority,
              // proto: dataTable.types.SRV.p
              // service: dataTable.types.SRV.
              target: dataTable.types.SRV.target,
              weight: dataTable.types.SRV.weight
            }
          }
        break;
        case "SSHFP":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              algorithm: dataTable.types.SSHFP.algorithm,
              fingerprint: dataTable.types.SSHFP.fingerprint,
              type: dataTable.types.SSHFP.type
            }
          }
        break;
        case "SVCB":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              priority: dataTable.types.SVCB.priority,
              target: dataTable.types.SVCB.target,
              value: dataTable.types.SVCB.value
            }
          }
        break;
        case "TLSA":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            // content: dataTable.types.SMIMEA.,
            // priority: Number(dataTable.types.MX.priority),
            ttl: Number(dataTable.TTL),
            data: {
              certificate: dataTable.types.TLSA.certificate,
              matching_type: dataTable.types.TLSA.matching_type,
              selector: dataTable.types.TLSA.selector,
              usage: dataTable.types.TLSA.usage
            }
          }
        break;
        case "TXT":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            content: dataTable.types.TXT.сontent,
            ttl: Number(dataTable.TTL)
          }
        break;
        case "URI":
          data = {
            type: dataTable.type,
            name: dataTable.name == "@" ? domain.name : dataTable.name,
            priority: Number(dataTable.types.URI.priority),
            ttl: Number(dataTable.TTL),
            data: {
              target: dataTable.types.URI.target,
              weight: dataTable.types.URI.weight
            }
          }
        break;
    }

    axios.post(process.env.NEXT_PUBLIC_API + `/zones/dns/${params.account}/${params.id}`, data, config).then((res:any) => {
      // console.log(res.data)
      if(!res.data.error?.length){
        getDNS()
        setIsEditing(false)
      }else{
        toast(lang?.error, {
          description: res.data.error[0].message,
        })
      }
    })
  }

  function further(){
    router.push(`/websites`)
  }

  if(loading){
    return <Loading />
  }

  if(!params.account || !params.id){
    return notFound()
  }

  return (
    <main>
      {user.length != 0?
      <div>
        <Toaster />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{domain.name}</h1>
            <p className="leading-7">Оптимизируйте безопасность, производительность и надежность вашего веб-трафика.</p>
            {/* <Link className="font-medium text-primary text-sm flex gap-1 items-center mt-2 hover:text-primary/80" href={"/websites"}><MoveLeft className="h-4"/>Назад к веб-сайтам</Link> */}
            

            <div className="flex flex-col border rounded-md w-full mt-8">
              <div className="flex flex-col p-5 w-full items-start mb-6">
                <b className="text-xl font-semibold">Серверы имен</b>
                <p className="text-sm mt-[5px]">Измените ваши серверы имен или авторитативные DNS-серверы. Это назначенные вам серверы имен.</p>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex w-full border-b bg-slate-100 max-lg:hidden">
                  <div className="w-[16%] pl-2 pt-2 pb-2 pr-4 font-semibold text-sm max-sm:hidden">Тип</div>
                  <div className="w-[84%] pl-2 pt-2 pb-2 pr-4 font-semibold text-sm max-sm:w-full">Значение</div>
                </div>
                <div>
                  {domain?.name_servers?.map((el: any) => 
                    <div className="flex w-full border-t" key={el}>
                      <div className="w-[16%] pl-2 pt-2 pb-2 pr-4 text-sm max-sm:hidden"><p className="text-stroke ">NS</p></div>
                      {/* <div className="w-[84%] pl-2 pt-2 pb-2 pr-4 text-sm max-sm:w-full"><p className="text-stroke">{el}</p></div> */}
                      <div className="w-[84%] flex gap-2 items-center cursor-pointer pl-2 pt-2 pb-2 pr-4 text-sm max-sm:w-full hover:text-primary" onClick={() => navigator.clipboard.writeText(el)}><p className="text-stroke">{el}</p> <Copy className="w-[10px] h-[10px]"/></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex pt-4 pb-4 pr-4 justify-end">
              <Button onClick={() => {
                further()
              }}>Continue</Button>
            </div>

            
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
