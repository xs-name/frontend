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


export default function Home({params}:any) {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(true);

  const [type, setType] = useState("A");

  //? Type = ALL
  const [name, setName] = useState("")
  const [TTL, setTTL] = useState("")
  const [proxyStatus, setProxyStatus] = useState(true)

  //? Type = A and AAAA
  const [A, setA] = useState({
    address: ""
  });

  //? Type = CAA
  const [CAA, setCAA] = useState({
    flags: 0,
    tag: "1",
    domain_name: "",
  });

  //? Type = CERT
  const [CERT, setCERT] = useState({
    cert: "",
    key_tag: "",
    algorithm: "",
    certificate: ""
  })
  
  //? Type = CNAME
  const [CNAME, setCNAME] = useState({
    target: ""
  })

  //? Type = DNSKEY
  const [DNSKEY, setDNSKEY] = useState({
    flags: "",
    protocol: "3 - DNSSEC",
    algorithm: "",
    public_key: ""
  })

  //? Type = DS
  const [DS, setDS] = useState({
    key_tag: "",
    algorithm: "",
    digest_type: "",
    digest: ""
  })

  //? Type = HTTPS
  const [HTTPS, setHTTPS] = useState({
    priority: "",
    target: "", 
    value: ""
  })

  useEffect(() => {
    setType("A")
  }, [isEditing])

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.add)
        setLoading(false)
        // setLoadingWebsites(false)
      });
    }
  }, [language])

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
              <div className="flex flex-col border-t p-5">
                {
                  type == "A" || type == "AAAA" ?
                  <div className="mb-2 text-sm">{name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} points to {A.address == "" ? <span className="text-muted-foreground font-medium">{type == "A" ? "[IPv4 address]" : "[IPv6 address]"}</span> : <span className="font-bold">{A.address}</span>} {proxyStatus ? "and has its traffic proxied through Cloudflare." : ""}</div>
                  :
                  type == "CAA" ?
                  <div className="mb-2 text-sm">{CAA.domain_name == "" ? <span className="text-muted-foreground font-medium">[domain name]</span> : <span className="font-bold">{CAA.domain_name}</span>} can issue certificates for {name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} and <span className="font-bold">{CAA.tag == '1' ? "only allow specific hostnames" : CAA.tag == '2' ? "only allow wildcards" : "sends violation reports to URL (http:, https:, or mailto:)"}.</span></div>
                  :
                  type == "CERT" ?
                  <div className="mb-2 text-sm">{name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} has certificate type {<span className="text-muted-foreground font-medium">[cert. type]</span>} and a public key encrypted with {<span className="text-muted-foreground font-medium">[algorithm]</span>}.</div>
                  :
                  type == "CNAME" ?
                  <div className="mb-2 text-sm">{name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} is an alias of {CNAME.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="font-bold">{CNAME.target}</span>} and has its traffic proxied through Cloudflare.</div>
                  :
                  type == "DNSKEY" ?
                  <div className="mb-2 text-sm">{name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} verifies DNSSEC with a public key encrypted with {<span className="text-muted-foreground font-medium">[algorithm]</span>}.</div>
                  :
                  type == "DS" ?
                  <div className="mb-2 text-sm">{name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} has a DNSSEC key with ID {DS.key_tag == "" ? <span className="text-muted-foreground font-medium">[key tag]</span> : <span className="font-bold">{DS.key_tag}</span>} and public key hashed by {DS.digest_type == "" ? <span className="text-muted-foreground font-medium">[digest type]</span> : DS.digest_type == "1" ? <span className="font-bold">SHA-1</span> : DS.digest_type == "2" ? <span className="font-bold">SHA-256</span> : DS.digest_type == "3" ? <span className="font-bold">GOST R 34,11-94</span> : <span className="font-bold">SHA-384</span>} for a DNSKEY record using {<span className="text-muted-foreground font-medium">[algorithm]</span>}.</div>
                  :
                  type == "HTTPS" ?
                  <div className="mb-2 text-sm">{name == "" ? <span className="text-muted-foreground font-medium">[name]</span> : name == "@" ? <span className="font-bold">wanddecisions.com</span> : <span className="font-bold">{`${name}.wanddecisions.com`}</span>} refers to {HTTPS.target == "" ? <span className="text-muted-foreground font-medium">[target]</span> : <span className="font-bold">{HTTPS.target}</span>} with priority {HTTPS.priority == "" ? <span className="text-muted-foreground font-medium">[priority]</span> : <span className="font-bold">{HTTPS.priority}</span>}.</div>
                  :
                  <div className="mb-2 text-sm"></div>
                }
                <div className="flex gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Type</Label>
                    <Select value={type} onValueChange={(value) => setType(value)}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="AAAA">AAAA</SelectItem>
                          <SelectItem value="CAA">CAA</SelectItem>
                          <SelectItem value="CERT">CERT</SelectItem>
                          <SelectItem value="CNAME">CNAME</SelectItem>
                          <SelectItem value="DNSKEY">DNSKEY</SelectItem>
                          <SelectItem value="DS">DS</SelectItem>
                          <SelectItem value="HTTPS">HTTPS</SelectItem>
                          {/* <SelectItem value="LOC">LOC</SelectItem>
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
                          <SelectItem value="URI">URI</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={type == "CERT" || type == "DNSKEY" || type == "DS" || type == "HTTPS" ? 'w-1/2' : ''}>
                    <Label className="text-xs text-muted-foreground">Name (required)</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    <p className="text-xs text-muted-foreground">Use @ for root</p>
                  </div>
                  {type == "CNAME" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Target (required)</Label>
                      <Input value={CNAME.target} onChange={(e) => setCNAME({...CNAME, target: e.target.value})} type="text" />
                    </div> : null
                  }
                  {type == "A" || type == "AAAA" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">{type == "A" ? "IPv4 address (required)" : "IPv6 address (required)"}</Label>
                      <Input value={A.address} onChange={(e) => setA({...A, address: e.target.value})} type="text" />
                    </div> : null
                  }
                  {type == "A" || type == "AAAA" || type == "CNAME"?
                    <div>
                      <Label className="text-xs text-muted-foreground">Proxy status</Label>
                      <div className="flex items-center space-x-2 h-9">
                        <Switch checked={proxyStatus} onCheckedChange={(value) => {
                          setProxyStatus(value)
                          setTTL("Auto")
                        }} id="proxy-status" />
                        <Label htmlFor="proxy-status">{proxyStatus ? "Proxied" : "DNS only"}</Label>
                      </div>
                    </div> : null
                  }
                  {type == "CAA" ?
                    <div className="w-48">
                      <Label className="text-xs text-muted-foreground">Flags (required)</Label>
                      <div className="flex items-center space-x-2 h-9">
                        {CAA.flags}
                      </div>
                    </div> : null
                  }
                  <div className="pl-3">
                    <Label className="text-xs text-muted-foreground">TTL</Label>
                    {!proxyStatus || type == "CAA" || type == "CERT" || type == "DNSKEY" || type == "DS" || type == "HTTPS"?
                      <Select value={TTL} onValueChange={(value) => setTTL(value)}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Auto">Auto</SelectItem>
                            <SelectItem value="1min">1 min</SelectItem>
                            <SelectItem value="2min">2 min</SelectItem>
                            <SelectItem value="5min">5 min</SelectItem>
                            <SelectItem value="10min">10 min</SelectItem>
                            <SelectItem value="15min">15 min</SelectItem>
                            <SelectItem value="30min">30 min</SelectItem>
                            <SelectItem value="1hr">1 hr</SelectItem>
                            <SelectItem value="2hr">2 hr</SelectItem>
                            <SelectItem value="5hr">5 hr</SelectItem>
                            <SelectItem value="5hr">5 hr</SelectItem>
                            <SelectItem value="12hr">12 hr</SelectItem>
                            <SelectItem value="1day">1 day</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      :
                      <div className="h-9 flex items-center">Auto</div>
                    }
                    
                  </div>
                </div>
                <div className="flex gap-4">
                  { type == "CAA" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Tag (required)</Label>
                      <Select value={CAA.tag} onValueChange={(value) => setCAA({...CAA, tag: value})}>
                        <SelectTrigger className="w-[333px]">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Only allow specific hostnames</SelectItem>
                            <SelectItem value="2">Only allow wildcards</SelectItem>
                            <SelectItem value="3">Send violation reports to URL (http:, https:, or mailto:)</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div> : null
                  }

                  {type == "CAA" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">CA domain name (required)</Label>
                      <Input value={CAA.domain_name} onChange={(e) => setCAA({...CAA, domain_name: e.target.value})} type="text" />
                    </div> : null
                  }

                  {type == "CERT" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Cert. type (required)</Label>
                      <Input value={CERT.cert} onChange={(e) => setCERT({...CERT, cert: e.target.value})} type="number" min={0} max={65535}/>
                      <p className="text-xs text-muted-foreground">0 - 65535</p>
                    </div> : null
                  }

                  {type == "CERT" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Key tag (required)</Label>
                      <Input value={CERT.key_tag} onChange={(e) => setCERT({...CERT, key_tag: e.target.value})} type="number" min={0} max={65535}/>
                      <p className="text-xs text-muted-foreground">0 - 65535</p>
                    </div> : null
                  }

                  {type == "CERT" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Algorithm (required)</Label>
                      <Input value={CERT.algorithm} onChange={(e) => setCERT({...CERT, algorithm: e.target.value})} type="number" min={0} max={255}/>
                      <p className="text-xs text-muted-foreground">0 - 255</p>
                    </div> : null
                  }

                  {type == "CERT" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Algorithm (required)</Label>
                      <Textarea className="resize-none" value={CERT.certificate} onChange={(e) => setCERT({...CERT, certificate: e.target.value})} placeholder="" />
                      <p className="text-xs text-muted-foreground">E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==</p>
                    </div> : null
                  }

                  {type == "DNSKEY" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Flags (required)</Label>
                      <Input value={DNSKEY.flags} onChange={(e) => setDNSKEY({...DNSKEY, flags: e.target.value})} type="number" min={0} max={65535}/>
                      <p className="text-xs text-muted-foreground">0 - 65535</p>
                    </div> : null
                  }

                  {type == "DNSKEY" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Protocol (required)</Label>
                      <Input disabled={true} value={DNSKEY.protocol} onChange={(e) => setDNSKEY({...DNSKEY, protocol: e.target.value})} type="text" className="w-28"/>
                    </div> : null
                  }

                  {type == "DNSKEY" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Algorithm (required)</Label>
                      <Input value={DNSKEY.algorithm} onChange={(e) => setDNSKEY({...DNSKEY, algorithm: e.target.value})} type="number" min={0} max={255}/>
                      <p className="text-xs text-muted-foreground">0 - 255</p>
                    </div> : null
                  }

                  {type == "DNSKEY" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Public Key (Base64) (required)</Label>
                      <Textarea className="resize-none" value={DNSKEY.public_key} onChange={(e) => setDNSKEY({...DNSKEY, public_key: e.target.value})} placeholder="" />
                      <p className="text-xs text-muted-foreground">E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==</p>
                    </div> : null
                  }

                  {type == "DS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Key tag (required)</Label>
                      <Input value={DS.key_tag} onChange={(e) => setDS({...DS, key_tag: e.target.value})} type="number" min={0} max={65535}/>
                      <p className="text-xs text-muted-foreground">0 - 65535</p>
                    </div> : null
                  }

                  {type == "DS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Protocol (required)</Label>
                      <Input value={DS.algorithm} onChange={(e) => setDS({...DS, algorithm: e.target.value})} type="number" min={0} max={255}/>
                      <p className="text-xs text-muted-foreground">0 - 255</p>
                    </div> : null
                  }

                  {type == "DS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Digest Type (required)</Label>
                      <Select value={DS.digest_type} onValueChange={(value) => setDS({...DS, digest_type: value})}>
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

                  {type == "DS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Digest (hexadecimal) (required)</Label>
                      <Textarea className="resize-none" value={DS.digest} onChange={(e) => setDS({...DS, digest: e.target.value})} placeholder="" />
                      <p className="text-xs text-muted-foreground">E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==</p>
                    </div> : null
                  }

                  {type == "HTTPS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Priority (required)</Label>
                      <Input value={HTTPS.priority} onChange={(e) => setHTTPS({...HTTPS, priority: e.target.value})} type="number" min={0} max={65535}/>
                      <p className="text-xs text-muted-foreground">0 - 65535</p>
                    </div> : null
                  }

                  {type == "HTTPS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Target (required)</Label>
                      <Input value={HTTPS.target} onChange={(e) => setHTTPS({...HTTPS, target: e.target.value})} type="text"/>
                    </div> : null
                  }

                  {type == "HTTPS" ?
                    <div>
                      <Label className="text-xs text-muted-foreground">Value</Label>
                      <Input value={HTTPS.value} onChange={(e) => setHTTPS({...HTTPS, value: e.target.value})} type="text"/>
                      <p className="text-xs text-muted-foreground">E.g. alpn="h3,h2" ipv4hint="127.0.0.1" ipv6hint="::1"</p>
                    </div> : null
                  }
                </div>
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
              
            </div>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
