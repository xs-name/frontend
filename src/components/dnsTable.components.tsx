/* eslint-disable react/no-unescaped-entities */
'use client';

import axios from 'axios';
import { Loading } from "@/components/Loading.components";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from 'react';


export const DnsTable = ({data, setData, className}: any) => {

  useEffect(() => {
    console.log(data)
    setData({...data, TTL: '1'})
  }, [data.type])

  useEffect(() => {
    // console.log(`${data.TTL}`)
    // const ttl = data.TTL;
    // setData({...data, TTL: `${ttl}`})
  }, [data])


    return(
        <>
        <div className={`${className} flex flex-col p-5`}>
            {
            data.type == "A" || data.type == "AAAA" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} points to {data.types.A.address == "" ? <span className="text-muted-foreground font-medium">{data.type == "A" ? "[IPv4 address]" : "[IPv6 address]"}</span> : <span className="font-bold">{data.types.A.address}</span>} {data.proxyStatus ? "and has its traffic proxied through Cloudflare." : ""}</div>
            :
            data.type == "CAA" ?
            <div className="mb-2 text-sm">{data.types.CAA.domain_name == "" ? <span className="text-muted-foreground font-medium">[domain name]</span> : <span className="font-bold">{data.types.CAA.domain_name}</span>} can issue certificates for {data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} and <span className="font-bold">{data.types.CAA.tag == 'issue' ? "only allow specific hostnames" : data.types.CAA.tag == 'issuewild' ? "only allow wildcards" : "sends violation reports to URL (http:, https:, or mailto:)"}.</span></div>
            :
            data.type == "CERT" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} has certificate type {<span className="text-muted-foreground font-medium">[cert. type]</span>} and a public key encrypted with {<span className="text-muted-foreground font-medium">[algorithm]</span>}.</div>
            :
            data.type == "CNAME" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} is an alias of {data.types.CNAME.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="font-bold">{data.types.CNAME.target}</span>} and has its traffic proxied through Cloudflare.</div>
            :
            data.type == "DNSKEY" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} verifies DNSSEC with a public key encrypted with {<span className="text-muted-foreground font-medium">[algorithm]</span>}.</div>
            :
            data.type == "DS" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} has a DNSSEC key with ID {data.types.DS.key_tag == "" ? <span className="text-muted-foreground font-medium">[key tag]</span> : <span className="font-bold">{data.types.DS.key_tag}</span>} and public key hashed by {data.types.DS.digest_type == "" ? <span className="text-muted-foreground font-medium">[digest type]</span> : data.types.DS.digest_type == "1" ? <span className="font-bold">SHA-1</span> : data.types.DS.digest_type == "2" ? <span className="font-bold">SHA-256</span> : data.types.DS.digest_type == "3" ? <span className="font-bold">GOST R 34,11-94</span> : <span className="font-bold">SHA-384</span>} for a DNSKEY record using {<span className="text-muted-foreground font-medium">[algorithm]</span>}.</div>
            :
            data.type == "HTTPS" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} refers to {data.types.HTTPS.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="font-bold">{data.types.HTTPS.target}</span>} with priority {data.types.HTTPS.priority == "" ? <span className="text-muted-foreground font-medium">[priority]</span> : <span className="font-bold">{data.types.HTTPS.priority}</span>}.</div>
            :
            data.type == "LOC" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} has location information <span className="font-bold">{data.types.LOC.latitude_degrees == "" ? "0" : data.types.LOC.latitude_degrees} {data.types.LOC.latitude_minutes == "" ? "0" : data.types.LOC.latitude_minutes} {data.types.LOC.latitude_seconds == "" ? "0" : data.types.LOC.latitude_seconds} {data.types.LOC.latitude_direction} {data.types.LOC.longitude_degrees == "" ? "0" : data.types.LOC.longitude_degrees} {data.types.LOC.longitude_minutes == "" ? "0" : data.types.LOC.longitude_minutes} {data.types.LOC.longitude_seconds == "" ? "0" : data.types.LOC.longitude_seconds} {data.types.LOC.longitude_direction} {data.types.LOC.altitude == "" ? "0m" : data.types.LOC.altitude + "m"} {data.types.LOC.size == "" ? "0m" : data.types.LOC.size + "m"} {data.types.LOC.horizontal == "" ? "0m" : data.types.LOC.horizontal + "m"} {data.types.LOC.vertical == "" ? "0m" : data.types.LOC.vertical + "m"}.</span></div>
            :
            data.type == "MX" ?
            <div className="mb-2 text-sm">{data.types.MX.mail == "" ? <span className="text-muted-foreground font-medium">[mail server]</span> : <span className="font-bold">{data.types.MX.mail}</span>} handles mail for {data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>}.</div>
            :
            data.type == "NAPTR" ?
            <div className="mb-2 text-sm">
                {data.types.NAPTR.flags == "S" ? <span>{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} returns a URI record against which a successive NAPTR lookup should be conducted.</span> : data.types.NAPTR.flags == "U" ? <span>{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} returns a record that specifies how to resolve a given SRV record.</span> : <span>{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>}  returns content {data.types.NAPTR.order == "" && data.types.NAPTR.flags == "" && data.types.NAPTR.preference == "" && data.types.NAPTR.regEx == "" && data.types.NAPTR.replacement == "" && data.types.NAPTR.service == "" ? <span className="text-muted-foreground font-medium">[content]</span> : <span className="font-bold">{data.types.NAPTR.order} {data.types.NAPTR.preference} {data.types.NAPTR.flags} {data.types.NAPTR.service} {data.types.NAPTR.regEx} {data.types.NAPTR.replacement}</span>}.</span>}
            </div>
            :
            data.type == "NS" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} is managed by {data.types.NS.nameserver == "" ? <span className="text-muted-foreground font-medium">[nameserver]</span> : <span className="font-bold">{data.types.NS.nameserver}</span>}.</div>
            :
            data.type == "PTR" ?
            <div className="mb-2 text-sm"> {data.types.PTR.domain == "" ? <span className="text-muted-foreground font-medium">[domain name]</span> : data.types.PTR.domain == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{data.types.PTR.domain}</span>} points to {data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} in a reverse lookup.</div>
            :
            data.type == "SMIMEA" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} has an association with <span className="text-muted-foreground font-medium">[selector]</span> using <span className="text-muted-foreground font-medium">[matching type]</span> and a <span className="text-muted-foreground font-medium">[usage]</span>.</div>
            :
            data.type == "SRV" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} points to {data.types.SRV.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="text-muted-foreground font-medium">{data.types.SRV.target}</span>} and listens on {data.types.SRV.port == "" ? <span className="text-muted-foreground font-medium">[port]</span> : <span className="font-bold">{data.types.SRV.port}</span>}.</div>
            :
            data.type == "SSHFP" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} uses <span className="text-muted-foreground font-medium">[algorithm]</span> with <span className="text-muted-foreground font-medium">[fingerprint type]</span> fingerprint {data.types.SSHFP.fingerprint == ""? <span className="text-muted-foreground font-medium">[fingerprint]</span> : <span className="font-bold">{data.types.SSHFP.fingerprint}</span>}.</div>
            :
            data.type == "SVCB" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} refers to {data.types.SVCB.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="font-bold">{data.types.SVCB.target}</span>} with priority {data.types.SVCB.priority == "" ? <span className="text-muted-foreground font-medium">[priority]</span> : <span className="font-bold">{data.types.SVCB.priority}</span>}.</div>
            :
            data.type == "TLSA" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} has an association with <span className="text-muted-foreground font-medium">[selector]</span> using <span className="text-muted-foreground font-medium">[matching type]</span> and a <span className="text-muted-foreground font-medium">[usage]</span>.</div>
            :
            data.type == "TXT" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} has a record with content {data.types.TXT.сontent == "" ? <span className="text-muted-foreground font-medium">[content]</span> : <span className="font-bold">{data.types.TXT.сontent}</span>}.</div>
            :
            data.type == "URI" ?
            <div className="mb-2 text-sm">{data.name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : data.name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${data.name}.wanddecisions.com`}</span>} points to {data.types.URI.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="font-bold">{data.types.URI.target}</span>}.</div>
            :
            <div className="mb-2 text-sm"></div>
            }
            <div className="flex gap-4 max-lg:flex-col">
            <div>
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Select value={data.type} onValueChange={(value) => setData({...data, type: value})}>
                <SelectTrigger className="w-[100px] mt-1 max-lg:w-full">
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="AAAA">AAAA</SelectItem>
                    <SelectItem value="CAA">CAA</SelectItem>
                    <SelectItem value="CERT">CERT</SelectItem>
                    <SelectItem value="CNAME">CNAME</SelectItem>
                    {/* <SelectItem value="DNSKEY">DNSKEY</SelectItem> */}
                    {/* <SelectItem value="DS">DS</SelectItem> */}
                    <SelectItem value="HTTPS">HTTPS</SelectItem>
                    <SelectItem value="LOC">LOC</SelectItem>
                    <SelectItem value="MX">MX</SelectItem>
                    <SelectItem value="NAPTR">NAPTR</SelectItem>
                    <SelectItem value="NS">NS</SelectItem>
                    <SelectItem value="PTR">PTR</SelectItem>
                    <SelectItem value="SMIMEA">SMIMEA</SelectItem>
                    <SelectItem value="SRV">SRV</SelectItem>
                    <SelectItem value="SSHFP">SSHFP</SelectItem>
                    <SelectItem value="SVCB">SVCB</SelectItem>
                    <SelectItem value="TLSA">TLSA</SelectItem>
                    <SelectItem value="TXT">TXT</SelectItem>
                    <SelectItem value="URI">URI</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <div className={data.type == "CERT" || data.type == "DNSKEY" || data.type == "DS" || data.type == "HTTPS" || data.type == "LOC" || data.type == "NAPTR" || data.type == "SMIMEA" || data.type == "SSHFP" || data.type == "SVCB" || data.type == "TLSA" || data.type == "TXT" || data.type == "URI" ? 'w-1/2 max-lg:w-full' : 'max-lg:w-full'}>
                <Label className="text-xs text-muted-foreground">Name (required)</Label>
                <Input value={data.name} onChange={(e) => setData({...data, name: e.target.value})} type="text" className="mb-1 mt-1"/>
                <p className="text-xs text-muted-foreground">Use @ for root</p>
            </div>
            {data.type == "SRV" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">Priority (required)</Label>
                <Input className="mb-1 mt-1" value={data.types.SRV.priority} onChange={(e) => setData({...data, types: {...data.types, SRV: {...data.types.SRV, priority: e.target.value}}})} type="number" />
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }
            {data.type == "SRV" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">Weight (required)</Label>
                <Input className="mb-1 mt-1" value={data.types.SRV.weight} onChange={(e) => setData({...data, types: {...data.types, SRV: {...data.types.SRV, weight: e.target.value}}})} type="number" />
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "MX" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">Mail server (required)</Label>
                <Input className="mb-1 mt-1" value={data.types.MX.mail} onChange={(e) => setData({...data, types: {...data.types, MX: {...data.types.MX, mail: e.target.value}}})} type="text" />
                <p className="text-xs text-muted-foreground">E.g. mx1.example.com</p>
                </div> : null
            }
            {data.type == "PTR" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">Domain name (required)</Label>
                <Input className="mb-1 mt-1" value={data.types.PTR.domain} onChange={(e) => setData({...data, types: {...data.types, PTR: {...data.types.PTR, domain: e.target.value}}})} type="text" />
                <p className="text-xs text-muted-foreground">E.g. www.example.com</p>
                </div> : null
            }
            {data.type == "CNAME" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">Target (required)</Label>
                <Input className="mb-1 mt-1" value={data.types.CNAME.target} onChange={(e) => setData({...data, types: {...data.types, CNAME: {...data.types.CNAME, target: e.target.value}}})} type="text" />
                </div> : null
            }
            {data.type == "A" || data.type == "AAAA" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground mt-1">{data.type == "A" ? "IPv4 address (required)" : "IPv6 address (required)"}</Label>
                <Input className="mb-1 mt-1" value={data.types.A.address} onChange={(e) => setData({...data, types: {...data.types, A: {...data.types.A, address: e.target.value}}})} type="text" />
                </div> : null
            }
            {data.type == "A" || data.type == "AAAA" || data.type == "CNAME"?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground">Proxy status</Label>
                <div className="flex items-center space-x-2 h-9 mb-1 mt-1">
                    <Switch checked={data.proxyStatus} onCheckedChange={(value) => {
                    setData({...data, proxyStatus: value, TTL: "1"})
                    }} id="proxy-status" />
                    <Label htmlFor="proxy-status">{data.proxyStatus ? "Proxied" : "DNS only"}</Label>
                </div>
                </div> : null
            }
            {data.type == "CAA" ?
                <div className="w-48 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Flags (required)</Label>
                <div className="flex items-center space-x-2 h-9">
                    {data.types.CAA.flags}
                </div>
                </div> : null
            }
            {data.type == "NS" ?
                <div className='max-lg:w-full'>
                <Label className="text-xs text-muted-foreground">Nameserver (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.NS.nameserver} onChange={(e) => setData({...data, types: {...data.types, NS: {...data.types.NS, nameserver: e.target.value}}})} type="text" />
                <p className="text-xs text-muted-foreground">E.g. ns1.example.com
                </p>
                </div> : null
            }
            
            <div className="pl-3 max-lg:pl-0">
                <Label className="text-xs text-muted-foreground">TTL</Label>
                {!data.proxyStatus || data.type == "CAA" || data.type == "CERT" || data.type == "DNSKEY" || data.type == "DS" || data.type == "HTTPS" || data.type == "LOC" || data.type == "MX" || data.type == "NAPTR" || data.type == "NS" || data.type == "PTR" || data.type == "SMIMEA" || data.type == "SRV" || data.type == "SSHFP" || data.type == "SVCB" || data.type == "TLSA" || data.type == "TXT" || data.type == "URI" ?
                <Select value={data.TTL} onValueChange={(value) => setData({...data, TTL: value})}>
                    <SelectTrigger className="w-[100px] mt-1 max-lg:w-full">
                    <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectItem value="1">Auto</SelectItem>
                        <SelectItem value="60">1 min</SelectItem>
                        <SelectItem value="120">2 min</SelectItem>
                        <SelectItem value="300">5 min</SelectItem>
                        <SelectItem value="600">10 min</SelectItem>
                        <SelectItem value="900">15 min</SelectItem>
                        <SelectItem value="1800">30 min</SelectItem>
                        <SelectItem value="3600">1 hr</SelectItem>
                        <SelectItem value="7200">2 hr</SelectItem>
                        <SelectItem value="18000">5 hr</SelectItem>
                        <SelectItem value="43200">12 hr</SelectItem>
                        <SelectItem value="86400">1 day</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
                :
                <div className="h-9 flex items-center">Auto</div>
                }
            </div>
            {data.type == "SRV" ?
                <div>
                <Label className="text-xs text-muted-foreground mt-1">Port (required)</Label>
                <Input className="mb-1 mt-1" value={data.types.SRV.port} onChange={(e) => setData({...data, types: {...data.types, SRV: {...data.types.SRV, port: e.target.value}}})} type="number" />
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }
            {data.type == "MX" ?
                <div>
                <Label className="text-xs text-muted-foreground">Priority (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.MX.priority} onChange={(e) => setData({...data, types: {...data.types, MX: {...data.types.MX, priority: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }
            </div>
            <div className="flex gap-4 mt-2 max-lg:flex-col">
            { data.type == "CAA" ?
                <div>
                <Label className="text-xs text-muted-foreground">Tag (required)</Label>
                <Select value={data.types.CAA.tag} onValueChange={(value) => setData({...data, types: {...data.types, CAA: {...data.types.CAA, tag: value}}})}>
                    <SelectTrigger className="w-[333px]">
                    <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectItem value="issue">Only allow specific hostnames</SelectItem>
                        <SelectItem value="issuewild">Only allow wildcards</SelectItem>
                        <SelectItem value="iodef">Send violation reports to URL (http:, https:, or mailto:)</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
                </div> : null
            }

            {data.type == "CAA" ?
                <div>
                <Label className="text-xs text-muted-foreground">CA domain name (required)</Label>
                <Input value={data.types.CAA.domain_name} onChange={(e) => setData({...data, types: {...data.types, CAA: {...data.types.CAA, domain_name: e.target.value}}})} type="text" />
                </div> : null
            }

            {data.type == "CERT" ?
                <div>
                <Label className="text-xs text-muted-foreground">Cert. type (required)</Label>
                <Input value={data.types.CERT.cert} onChange={(e) => setData({...data, types: {...data.types, CERT: {...data.types.CERT, cert: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "CERT" ?
                <div>
                <Label className="text-xs text-muted-foreground">Key tag (required)</Label>
                <Input value={data.types.CERT.key_tag} onChange={(e) => setData({...data, types: {...data.types, CERT: {...data.types.CERT, key_tag: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "CERT" ?
                <div>
                <Label className="text-xs text-muted-foreground">Algorithm (required)</Label>
                <Input value={data.types.CERT.algorithm} onChange={(e) => setData({...data, types: {...data.types, CERT: {...data.types.CERT, algorithm: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "CERT" ?
                <div>
                <Label className="text-xs text-muted-foreground">Certificate (Base64) (required)</Label>
                <Textarea className="resize-none" value={data.types.CERT.certificate} onChange={(e) => setData({...data, types: {...data.types, CERT: {...data.types.CERT, certificate: e.target.value}}})} placeholder="" />
                <p className="text-xs text-muted-foreground">E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==</p>
                </div> : null
            }

            {data.type == "DNSKEY" ?
                <div>
                <Label className="text-xs text-muted-foreground">Flags (required)</Label>
                <Input value={data.types.DNSKEY.flags} onChange={(e) => setData({...data, types: {...data.types, DNSKEY: {...data.types.DNSKEY, flags: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "DNSKEY" ?
                <div>
                <Label className="text-xs text-muted-foreground">Protocol (required)</Label>
                <Input disabled={true} value={data.types.DNSKEY.protocol} onChange={(e) => setData({...data, types: {...data.types, DNSKEY: {...data.types.DNSKEY, protocol: e.target.value}}})} type="text" className="w-28"/>
                </div> : null
            }

            {data.type == "DNSKEY" ?
                <div>
                <Label className="text-xs text-muted-foreground">Algorithm (required)</Label>
                <Input value={data.types.DNSKEY.algorithm} onChange={(e) => setData({...data, types: {...data.types, DNSKEY: {...data.types.DNSKEY, algorithm: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "DNSKEY" ?
                <div>
                <Label className="text-xs text-muted-foreground">Public Key (Base64) (required)</Label>
                <Textarea className="resize-none" value={data.types.DNSKEY.public_key} onChange={(e) => setData({...data, types: {...data.types, DNSKEY: {...data.types.DNSKEY, public_key: e.target.value}}})} placeholder="" />
                <p className="text-xs text-muted-foreground">E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==</p>
                </div> : null
            }

            {data.type == "SSHFP" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Algorithm (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SSHFP.algorithm} onChange={(e) => setData({...data, types: {...data.types, SSHFP: {...data.types.SSHFP, algorithm: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "SSHFP" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Type (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SSHFP.type} onChange={(e) => setData({...data, types: {...data.types, SSHFP: {...data.types.SSHFP, type: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "SSHFP" ?
                <div className="w-1/2 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Fingerprint (hexadecimal) (required)</Label>
                <Textarea className="resize-none mt-1 mb-1" value={data.types.SSHFP.fingerprint} onChange={(e) => setData({...data, types: {...data.types, SSHFP: {...data.types.SSHFP, fingerprint: e.target.value}}})} placeholder=""/>
                <p className="text-xs text-muted-foreground">E.g. 436c6f7564666c...61726520444e53</p>
                </div> : null
            }

            {data.type == "URI" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Priority (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.URI.priority} onChange={(e) => setData({...data, types: {...data.types, URI: {...data.types.URI, priority: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "URI" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Weight (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.URI.weight} onChange={(e) => setData({...data, types: {...data.types, URI: {...data.types.URI, weight: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "URI" ?
                <div className="w-1/2 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Target (required)</Label>
                <Textarea className="resize-none mt-1 mb-1" value={data.types.URI.target} onChange={(e) => setData({...data, types: {...data.types, URI: {...data.types.URI, target: e.target.value}}})} placeholder=""/>
                </div> : null
            }

            {data.type == "SRV" ?
                <div className="w-1/2 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Target (required)</Label>
                <Textarea className="resize-none" value={data.types.SRV.target} onChange={(e) => setData({...data, types: {...data.types, SRV: {...data.types.SRV, target: e.target.value}}})} placeholder="" />
                <p className="text-xs text-muted-foreground">E.g. www.example.com</p>
                </div> : null
            }

            {data.type == "DS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Key tag (required)</Label>
                <Input value={data.types.DS.key_tag} onChange={(e) => setData({...data, types: {...data.types, DS: {...data.types.DS, key_tag: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "DS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Protocol (required)</Label>
                <Input value={data.types.DS.algorithm} onChange={(e) => setData({...data, types: {...data.types, DS: {...data.types.DS, algorithm: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "DS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Digest Type (required)</Label>
                <Select value={data.types.DS.digest_type} onValueChange={(value) => setData({...data, types: {...data.types, DS: {...data.types.DS, digest_type: value}}})}>
                    <SelectTrigger className="w-[112px]">
                    <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectItem value="1">1 - SHA-1</SelectItem>
                        <SelectItem value="2">2 - SHA-256</SelectItem>
                        <SelectItem value="3">3 - GOST R 34,11-94</SelectItem>
                        <SelectItem value="4">4 - SHA-384</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
                </div> : null
            }

            {data.type == "DS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Digest (hexadecimal) (required)</Label>
                <Textarea className="resize-none" value={data.types.DS.digest} onChange={(e) => setData({...data, types: {...data.types, DS: {...data.types.DS, digest: e.target.value}}})} placeholder="" />
                <p className="text-xs text-muted-foreground">E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==</p>
                </div> : null
            }

            {data.type == "HTTPS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Priority (required)</Label>
                <Input value={data.types.HTTPS.priority} onChange={(e) => setData({...data, types: {...data.types, HTTPS: {...data.types.HTTPS, priority: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "HTTPS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Target (required)</Label>
                <Input value={data.types.HTTPS.target} onChange={(e) => setData({...data, types: {...data.types, HTTPS: {...data.types.HTTPS, target: e.target.value}}})} type="text"/>
                </div> : null
            }

            {data.type == "HTTPS" ?
                <div>
                <Label className="text-xs text-muted-foreground">Value</Label>
                <Input value={data.types.HTTPS.value} onChange={(e) => setData({...data, types: {...data.types, HTTPS: {...data.types.HTTPS, value: e.target.value}}})} type="text"/>
                <p className="text-xs text-muted-foreground">E.g. alpn="h3,h2" ipv4hint="127.0.0.1" ipv6hint="::1"</p>
                </div> : null
            }

            {data.type == "NAPTR" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Order (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.NAPTR.order} onChange={(e) => setData({...data, types: {...data.types, NAPTR: {...data.types.NAPTR, order: e.target.value}}})} max={65535} min={0} type="number"/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "NAPTR" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Preference (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.NAPTR.preference} onChange={(e) => setData({...data, types: {...data.types, NAPTR: {...data.types.NAPTR, preference: e.target.value}}})} max={65535} min={0} type="number"/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "NAPTR" ?
                <div  className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Flags (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.NAPTR.flags} onChange={(e) => setData({...data, types: {...data.types, NAPTR: {...data.types.NAPTR, flags: e.target.value}}})} type="text"/>
                <p className="text-xs text-muted-foreground">S, A, U, P</p>
                </div> : null
            }

            {data.type == "NAPTR" ?
                <div className="w-1/3 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Service (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.NAPTR.service} onChange={(e) => setData({...data, types: {...data.types, NAPTR: {...data.types.NAPTR, service: e.target.value}}})} type="text"/>
                <p className="text-xs text-muted-foreground">E.g. protocol=...</p>
                </div> : null
            }

            {data.type == "SMIMEA" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Usage (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SMIMEA.usage} onChange={(e) => setData({...data, types: {...data.types, SMIMEA: {...data.types.SMIMEA, usage: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "SMIMEA" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Selector (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SMIMEA.selector} onChange={(e) => setData({...data, types: {...data.types, SMIMEA: {...data.types.SMIMEA, selector: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "SMIMEA" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Matching type (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SMIMEA.matching_type} onChange={(e) => setData({...data, types: {...data.types, SMIMEA: {...data.types.SMIMEA, matching_type: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "SMIMEA" ?
                <div className="w-1/2 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Certificate (hexadecimal) (required)</Label>
                <Textarea className="resize-none mt-1 mb-1" value={data.types.SMIMEA.certificate} onChange={(e) => setData({...data, types: {...data.types, SMIMEA: {...data.types.SMIMEA, certificate: e.target.value}}})} placeholder="" />
                <p className="text-xs text-muted-foreground">E.g. 436c6f7564666c...61726520444e53</p>
                </div> : null
            }

            {data.type == "SVCB" ?
                <div>
                <Label className="text-xs text-muted-foreground">Priority (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SVCB.priority} onChange={(e) => setData({...data, types: {...data.types, SVCB: {...data.types.SVCB, priority: e.target.value}}})} type="number" min={0} max={65535}/>
                <p className="text-xs text-muted-foreground">0 - 65535</p>
                </div> : null
            }

            {data.type == "SVCB" ?
                <div className="w-1/3 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Target (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.SVCB.target} onChange={(e) => setData({...data, types: {...data.types, SVCB: {...data.types.SVCB, target: e.target.value}}})} type="text"/>
                </div> : null
            }

            {data.type == "SVCB" ?
                <div className="w-1/3 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Value</Label>
                <Input className="mt-1 mb-1" value={data.types.SVCB.value} onChange={(e) => setData({...data, types: {...data.types, SVCB: {...data.types.SVCB, value: e.target.value}}})} type="text"/>
                <p className="text-xs text-muted-foreground">E.g. alpn="h3,h2" ipv4hint="127.0.0.1" ipv6hint="::1"</p>
                </div> : null
            }

            {data.type == "TLSA" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Usage (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.TLSA.usage} onChange={(e) => setData({...data, types: {...data.types, TLSA: {...data.types.TLSA, usage: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "TLSA" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Selector (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.TLSA.selector} onChange={(e) => setData({...data, types: {...data.types, TLSA: {...data.types.TLSA, selector: e.target.value}}})}  type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "TLSA" ?
                <div className="w-1/6 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Matching type (required)</Label>
                <Input className="mt-1 mb-1" value={data.types.TLSA.matching_type} onChange={(e) => setData({...data, types: {...data.types, TLSA: {...data.types.TLSA, matching_type: e.target.value}}})} type="number" min={0} max={255}/>
                <p className="text-xs text-muted-foreground">0 - 255</p>
                </div> : null
            }

            {data.type == "TLSA" ?
                <div className="w-1/2 max-lg:w-full">
                <Label className="text-xs text-muted-foreground">Certificate (hexadecimal) (required)</Label>
                <Textarea className="resize-none mt-1 mb-1" value={data.types.TLSA.certificate} onChange={(e) => setData({...data, types: {...data.types, TLSA: {...data.types.TLSA, certificate: e.target.value}}})} placeholder="" />
                <p className="text-xs text-muted-foreground">E.g. 436c6f7564666c...61726520444e53</p>
                </div> : null
            }

            {data.type == "TXT" ?
                <div className="w-full">
                <Label className="text-xs text-muted-foreground">Content (required)</Label>
                <Textarea className="resize-none mt-1 mb-1" value={data.types.TXT.сontent} onChange={(e) => setData({...data, types: {...data.types, TXT: {...data.types.TXT, сontent: e.target.value}}})} placeholder="" />
                </div> : null
            }

            
            </div>
            {data.type == "NAPTR" ?
            <div className="flex gap-4 mt-2 max-lg:flex-col">
                <div className="w-1/3 max-lg:w-full">
                    <Label className="text-xs text-muted-foreground">RegEx</Label>
                    <Input className="mt-1 mb-1" value={data.types.NAPTR.regEx} onChange={(e) => setData({...data, types: {...data.types, NAPTR: {...data.types.NAPTR, regEx: e.target.value}}})} type="text"/>
                    <p className="text-xs text-muted-foreground">E.g. delim-char=...</p>
                </div>
                <div className="w-2/3 max-lg:w-full">
                    <Label className="text-xs text-muted-foreground">Replacement</Label>
                    <Input className="mt-1 mb-1" value={data.types.NAPTR.replacement} onChange={(e) => setData({...data, types: {...data.types, NAPTR: {...data.types.NAPTR, replacement: e.target.value}}})} type="text"/>
                </div>
            </div> : null
            }
            {data.type == "LOC" ?
            <div>
                <p className="text-sm font-semibold">Set latitude</p>
                <div className="flex gap-4 max-lg:flex-col">
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Degrees (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.latitude_degrees} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, latitude_degrees: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Minutes (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.latitude_minutes} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, latitude_minutes: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Seconds (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.latitude_seconds} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, latitude_seconds: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Direction (required)</Label>
                    <Select value={data.types.LOC.latitude_direction} onValueChange={(value) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, latitude_direction: value}}})}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="N">North</SelectItem>
                        <SelectItem value="S">South</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
                </div>
                <p className="text-sm font-semibold mt-3">Set longitude</p>
                <div className="flex gap-4 max-lg:flex-col">
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Degrees (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.longitude_degrees} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, longitude_degrees: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Minutes (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.longitude_minutes} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, longitude_minutes: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Seconds (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.longitude_seconds} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, longitude_seconds: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Direction (required)</Label>
                    <Select value={data.types.LOC.longitude_direction} onValueChange={(value) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, longitude_direction: value}}})}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="E">East</SelectItem>
                        <SelectItem value="W">West</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </div>
                </div>
                <p className="text-sm font-semibold mt-3">Precision (in meters)</p>
                <div className="flex gap-4 max-lg:flex-col">
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Horizontal (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.horizontal} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, horizontal: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Vertical (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.vertical} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, vertical: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Altitude (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.altitude} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, altitude: e.target.value}}})} type="number"/>
                </div>
                <div className="w-full">
                    <Label className="text-xs text-muted-foreground">Size (required)</Label>
                    <Input className="mt-1 w-full" value={data.types.LOC.size} onChange={(e) => setData({...data, types: {...data.types, LOC: {...data.types.LOC, size: e.target.value}}})} type="number"/>
                </div>
                </div>
                
                
            </div> : null
            }

        </div>
        </>
    )
}