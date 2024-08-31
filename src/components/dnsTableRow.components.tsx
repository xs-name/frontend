'use client';

import { ChevronRight, Pencil, Settings2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DnsTable } from "./dnsTable.components";
import { Button } from "./ui/button";
import axios from 'axios';
import { headers } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const DnsTableRow = ({deleteDNS, updateDNS, element}: any) => {

    const [active, setActive] = useState(false);
    const [modal, setModal] = useState(false)

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

    useEffect(() => {
      // console.log('element', element.type, element)

      switch(element.type){
        case "A":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, A: {...dataTable.types.A, address: element.content}}})
        break;
        case "AAAA":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, A: {...dataTable.types.A, address: element.content}}})
        break;
        case "CAA":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, CAA: {...dataTable.types.CAA, flags: element.data.flags, tag: element.data.tag, domain_name: element.data.value}}})
        break;
        case "CERT":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, CERT: {...dataTable.types.CERT, cert: element.data.type, key_tag: element.data.key_tag, algorithm: element.data.algorithm, certificate: element.data.certificate}}})
        break;
        case "CNAME":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, CNAME: {...dataTable.types.CNAME, target: element.content}}})
        break;
        //? DNSKEY и DS
        case "HTTPS":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, HTTPS: {...dataTable.types.HTTPS, priority: element.data.priority, target: element.data.target, value: element.data.value}}})
        break;
        case "LOC":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, LOC: {...dataTable.types.LOC, latitude_degrees: element.data.lat_degrees, latitude_minutes: element.data.lat_minutes, latitude_seconds: element.data.lat_seconds, latitude_direction: element.data.lat_direction, longitude_degrees: element.data.long_degrees, longitude_minutes: element.data.long_minutes, longitude_seconds: element.data.long_seconds, longitude_direction: element.data.long_direction, size: element.data.size, altitude: element.data.altitude, vertical: element.data.precision_vert, horizontal: element.data.precision_horz}}})
        break;
        case "MX":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, MX: {...dataTable.types.MX, mail: element.content, priority: element.priority}}})
        break;
        case "NAPTR":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, NAPTR: {...dataTable.types.NAPTR, order: element.data.order, preference: element.data.preference, flags: element.data.flags, service: element.data.service, regEx: element.data.regex, replacement: element.data.replacement}}})
        break;
        case "NS":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, NS: {...dataTable.types.NS, nameserver: element.content}}})
        break;
        case "SMIMEA":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, SMIMEA: {...dataTable.types.SMIMEA, usage: element.data.usage, selector: element.data.selector, matching_type: element.data.matching_type, certificate: element.data.certificate}}})
        break;
        case "SRV":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, SRV: {...dataTable.types.SRV, priority: element.data.priority, weight: element.data.weight, port: element.data.port, target: element.data.target}}})
        break;
        case "SSHFP":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, SSHFP: {...dataTable.types.SSHFP, algorithm: element.data.algorithm, type: element.data.type, fingerprint: element.data.fingerprint}}})
        break;
        case "SVCB":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, SVCB: {...dataTable.types.SVCB, priority: element.data.priority, target: element.data.target, value: element.data.value}}})
        break;
        case "TLSA":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, TLSA: {...dataTable.types.TLSA, usage: element.data.usage, selector: element.data.selector, matching_type: element.data.matching_type, certificate: element.data.certificate}}})
        break;
        case "TXT":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, TXT: {...dataTable.types.TXT, сontent: element.content}}})
        break;
        case "URI":
          setDataTable({...dataTable, domain: element.zone_name, proxyStatus: element.proxied, type: element.type, name: element.name, TTL: element.ttl, types: {...dataTable.types, URI: {...dataTable.types.URI, priority: element.priority, weight: element.data.weight, target: element.data.target}}})
        break;
      }

    }, [element])


    const [TTL, setTTL] = useState<any>({
      "1": "Auto",
      "60": "1 min",
      "120": "2 min",
      "300": "5 min",
      "600": "10 min",
      "900": "15 min",
      "1800": "30 min",
      "3600": "1 hr",
      "7200": "2 hr",
      "18000": "5 hr",
      "43200": "12 hr",
      "86400": "1 day"
    })
    
    return(
      <>
        <div className="border-b max-lg:hidden">
            <div className="flex w-full">
                {/* <div className="w-[12px]"></div> */}
                <div className="w-[12%] pl-2 pt-2 pl-4 pr-4 text-sm"><p className="text-stroke">{element?.type}</p></div>
                <div className="w-[20%] pl-2 pt-2 pb-2 pr-4 text-sm"><p className="text-stroke">{element?.name === dataTable.domain ? element?.name : element?.name.replace(`.${dataTable.domain}`, '')}</p></div>
                <div className="w-[25%] pl-2 pt-2 pb-2 pr-4 text-sm"><p className="text-stroke">{element?.content}</p></div>
                <div className="w-[20%] pl-2 pt-2 pb-2 pr-4 text-sm"><p className="text-stroke">{element?.proxied === true? "Proxied" : "DNS only"}</p></div>
                <div className="w-[12%] pl-2 pt-2 pb-2 pr-4 text-sm"><p className="text-stroke">{TTL[element?.ttl]}</p></div>
                <div className="w-[11%] pl-2 pt-2 pb-2 pr-4 flex justify-end text-sm"><div className="cursor-pointer flex text-primary" onClick={() => setActive(!active)}>Edit <ChevronRight className={active? "w-4 rotate-90 transition-all" : "w-4 transition-all"}/></div></div>
            </div>
            {active ? 
                <div>
                    <DnsTable data={dataTable} setData={setDataTable}/>
                    <div className="flex justify-between pr-5 pl-5 pb-5">
                        <Button onClick={() => deleteDNS(element.id)}>
                          <Trash2 className="mr-2 h-4 w-4"/> Delete
                        </Button>
                        <div className="flex gap-2 justify-end">
                          <Button className="" variant="secondary" onClick={() => setActive(false)}>Cancel</Button>
                          <Button onClick={() => updateDNS(element.id, dataTable, element.type, setActive)}>Save</Button>
                        </div>
                    </div>
                </div> : null
            }
        </div>
        <div className="hidden max-lg:flex flex-col pt-3 pb-3 pr-5 pl-5 border-t overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="font-semibold">{element?.type}</div>
              <div>({element?.proxied === true? "Proxied" : "DNS only"})</div>
            </div>
            <Dialog open={modal} onOpenChange={setModal}>
              <DialogTrigger>
                <div className="p-2 cursor-pointer rounded-md bg-primary text-white"><Pencil className="w-4 h-4" /></div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-dvh lg:max-w-screen-lg overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Edit record</DialogTitle>
                </DialogHeader>
                <DnsTable className="pt-0 pl-0 pr-0 pb-0" data={dataTable} setData={setDataTable}/>
                <DialogFooter className="max-sm:gap-2">
                  <Button variant="destructive" onClick={() => {
                    deleteDNS(element.id)
                    setModal(false)
                  }}>
                    <Trash2 className="mr-2 h-4 w-4"/> Delete
                  </Button>
                  <Button type="submit" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
                  <Button type="submit" onClick={() => {
                    updateDNS(element.id, dataTable, element.type, setActive)
                    setModal(false)
                  }}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-5 font-semibold overflow-hidden">
            {element?.name}
          </div>
          <div className="font-semibold overflow-hidden">
            {element?.content}
          </div>
        </div>

        
      </>
    )
}