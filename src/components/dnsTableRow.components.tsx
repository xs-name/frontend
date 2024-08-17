'use client';

import { ChevronRight, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { DnsTable } from "./dnsTable.components";
import { Button } from "./ui/button";

export const DnsTableRow = ({data, setData}: any) => {

    const [active, setActive] = useState(false);

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
    
    return(
        <div className="border-b">
            <div className="flex w-full">
                <div className="w-[12px]"></div>
                <div className="w-[14%] pl-2 pt-2 pb-2 pr-4">{data.type}</div>
                <div className="w-[23%] pl-2 pt-2 pb-2 pr-4">{data.name}</div>
                <div className="w-[29%] pl-2 pt-2 pb-2 pr-4">{data.content}</div>
                <div className="w-[22%] pl-2 pt-2 pb-2 pr-4">{data.proxyStatus === true? "Proxied" : "DNS only"}</div>
                <div className="w-[12%] pl-2 pt-2 pb-2 pr-4">{data.TTL}</div>
                <div className="w-[12.5%] pl-2 pt-2 pb-2 pr-4 flex justify-end"><div className="cursor-pointer flex text-primary" onClick={() => setActive(!active)}>Edit <ChevronRight className={active? "w-4 rotate-90 transition-all" : "w-4 transition-all"}/></div></div>
            </div>
            {active ? 
                <div>
                    <DnsTable data={dataTable} setData={setDataTable}/>
                    <div className="flex justify-between pr-5 pl-5 pb-5">
                        <Button>
                        <Trash2 className="mr-2 h-4 w-4"/> Delete
                        </Button>
                        <div className="flex gap-2 justify-end">
                            <Button className="" variant="secondary" onClick={() => setActive(false)}>Cancel</Button>
                            <Button className="">Save</Button>
                        </div>
                    </div>
                </div> : null
            }
            
        </div>
    )
}