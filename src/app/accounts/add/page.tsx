"use client"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Nav from "@/components/Nav"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loading } from "@/components/Loading.components"
import { getLanguage } from "@/lib/language"
import { useLanguageContext } from "@/components/LanguageProvider"
import AuthPage from "@/components/AuthPage.component"
import { config, headers } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUserContext } from "@/components/userProvider"
import { getUser } from "@/lib/user"
 


export default function Accounts() {
    const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)

  const [symbol, setSymbol] = useState(';');
  const [accounts, setAccounts] = useState('');
  const [step, setStep] = useState(1);
  const [tableStatus, setTableStatus] = useState<any>('true');
  const [loadingAccounts, setLoadingAccounts] = useState(false)
  const [countCorrect, setCountCorrect] = useState(0);
  const [resulData, setResultData] = useState<any>([]);

  const [accountResult, setAccountResult] = useState<any>([]);


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


  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.accounts)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])


  function CheckingData(){
    let arr = accounts.split('\n');
    const arrResult: any = []
    let count = 0;

    let indexEmail = -1;
    let indexPassword = -1;

    
    for(let i = 0; i < arr.length; i++){
        let elem = arr[i].split(symbol);

        if(indexEmail != -1 && indexPassword != -1){
            break
        }

        for(let j = 0; j < elem.length; j++){
            if(/^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z]+$/.test(elem[j])){
                indexEmail = j
            }
            if(/^[a-f0-9]{37}$/i.test(elem[j])){
                indexPassword = j
            }
        }
        
    }
    

    for(let i = 0; i < arr.length; i++){
        let elem = arr[i].split(symbol);

        const isEmail = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z]+$/.test(elem[indexEmail]);
        const isToken = /^[a-f0-9]{37}$/i.test(elem[indexPassword]);

        const el = {
            email: elem[indexEmail],
            token: elem[indexPassword],
            status: isEmail && isToken
        }

        if(isEmail && isToken){
            count++
        }

        arrResult.push(el)
    }

    setAccountResult(arrResult)
    setCountCorrect(count)

    setStep(2)
  }

  function saveAccounts(){
    let data:any = []
    for(let i = 0; i < accountResult.length; i++){
        if(accountResult[i].status){
            data.push({
                email: accountResult[i].email,
                token: accountResult[i].token,
            })
        }
    }

    axios.post(process.env.NEXT_PUBLIC_API + `/cf-accounts/import`, {data: data}, config).then((res:any) => {
        if(!res.data.error?.length){
            setStep(3)
            setResultData(res.data.result[0])
            // console.log(res.data.result[0])
        }else{
          //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
        }
      }).finally(() => setLoadingAccounts(false))
  }

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {user.length != 0?
      <div>
        {/* {loadingAccounts?
        <div className="h-dvh w-dvw fixed top-0 left-0 flex items-center justify-center bg-black/20 z-50">
            <Loader2 className="animate-spin w-8 h-8"/>
        </div> : null} */}
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.add_accounts}</h1>
            <p className="leading-7">{lang?.add_accounts_description}</p>
            {step == 1? 
            <div className="flex flex-col mt-4">
                <div className='max-lg:w-full'>
                    <Label className="text-xs text-muted-foreground">{lang?.title}</Label>
                    <Textarea value={accounts} onChange={(e) => setAccounts(e.target.value)} placeholder={lang?.place_accounts} />
                </div>
                <div className="flex justify-between mt-3 items-end max-sm:flex-col max-sm:gap-2 max-sm:mt-2 max-sm:items-start">
                    <div className='max-lg:w-full'>
                        <Label className="text-xs text-muted-foreground">{lang?.separator_character}</Label>
                        <Input maxLength={1} value={symbol} onChange={(e) => setSymbol(e.target.value)} type="text" placeholder={lang?.separator_character} />
                    </div>
                    <Button type="submit" onClick={() => CheckingData()}>{lang?.continue}</Button>
                </div>
            </div>
            :
            step == 2?
            <>
                <div className="flex flex-col gap-3 mt-2">
                    <Tabs defaultValue="successful" className="w-full">
                        <TabsList>
                            <TabsTrigger value="successful" className="gap-2">{lang?.successful} <Badge>{countCorrect}</Badge></TabsTrigger>
                            <TabsTrigger value="failures" className="gap-2">{lang?.failures} <Badge>{accountResult.length - countCorrect}</Badge></TabsTrigger>
                        </TabsList>
                        <TabsContent value="successful">
                            <ScrollArea className="h-[400px] border rounded-md">
                                <Table className="w-full">
                                    <TableHeader className="sticky top-0 bg-white">
                                        <TableRow>
                                            <TableHead>{lang?.email} <div className="hidden max-lg:flex">{lang?.token}</div></TableHead>
                                            <TableHead className="max-lg:hidden">{lang?.token}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {accountResult.map((item: any) => 
                                            item.status?
                                            <TableRow key={item.email}>
                                                <TableCell>{item.email} <div className="hidden max-lg:flex">{item.token}</div></TableCell>
                                                <TableCell className="max-lg:hidden">{item.token}</TableCell>
                                            </TableRow> : null
                                        )}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="failures" >
                            <ScrollArea className="h-[400px] border rounded-md">
                                <Table className="w-full">
                                    <TableHeader className="sticky top-0 bg-white">
                                        <TableRow>
                                            <TableHead>{lang?.email} <div className="hidden max-lg:flex">{lang?.token}</div></TableHead>
                                            <TableHead className="max-lg:hidden">{lang?.token}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {accountResult.map((item: any) => 
                                            !item.status?
                                            <TableRow key={item.email}>
                                                <TableCell>{item.email} <div className="hidden max-lg:flex">{item.token}</div></TableCell>
                                                <TableCell className="max-lg:hidden">{item.token}</TableCell>
                                            </TableRow> : null
                                        )}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                    <div className="flex justify-end gap-2">
                        <Button disabled={loadingAccounts} variant="secondary" onClick={() => setStep(1)}>{lang?.back}</Button>
                        <Button disabled={loadingAccounts} type="submit" onClick={() => {
                            saveAccounts()
                            setLoadingAccounts(true)
                        }}>{loadingAccounts? <div className="flex items-center gap-1"><Loader2 className="animate-spin w-4 h-4"/> {lang?.processing}</div> : lang?.continue}</Button>
                    </div>
                    
                    {/* <Table className="w-full border">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-2">Email</TableHead>
                                <TableHead className="p-2">Token</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {noCorrect.map((item: any) => 
                                <TableRow key={item.email}>
                                    <TableCell className="p-2 text-xs">{item.email}</TableCell>
                                    <TableCell className="p-2 text-xs">{item.token}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table> */}
                </div>
            </>
            :
            <div className="flex flex-col gap-3 mt-2">
                <Tabs defaultValue={resulData?.valid?.length == 0 ? 'failures' : 'successful'} className="w-full">
                    <TabsList>
                        <TabsTrigger value="successful" className="gap-2">{lang?.successful} <Badge>{resulData?.valid?.length}</Badge></TabsTrigger>
                        <TabsTrigger value="failures" className="gap-2">{lang?.failures} <Badge>{resulData?.invalid?.length}</Badge></TabsTrigger>
                    </TabsList>
                    <TabsContent value="successful">
                        <ScrollArea className="h-[400px] border rounded-md">
                            <Table className="w-full">
                                <TableHeader className="sticky top-0 bg-white">
                                    <TableRow>
                                        <TableHead>{lang?.email} <div className="hidden max-lg:flex">{lang?.message}</div></TableHead>
                                        <TableHead className="max-lg:hidden">{lang?.message}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {resulData?.valid?.map((item: any) => 
                                        <TableRow key={item.email}>
                                            <TableCell>{item.email} <div className="hidden max-lg:flex">{item.message}</div></TableCell>
                                            <TableCell className="max-lg:hidden">{item.message}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="failures" >
                        <ScrollArea className="h-[400px] border rounded-md">
                            <Table className="w-full">
                                <TableHeader className="sticky top-0 bg-white">
                                    <TableRow>
                                        <TableHead>{lang?.email} <div className="hidden max-lg:flex">{lang?.message}</div></TableHead>
                                        <TableHead className="max-lg:hidden">{lang?.message}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {resulData?.invalid?.map((item: any) => 
                                        <TableRow key={item.email}>
                                            <TableCell>{item.email} <div className="hidden max-lg:flex">{item.message}</div></TableCell>
                                            <TableCell className="max-lg:hidden">{item.message}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
                <div className="flex justify-end">
                    <Link href={'/accounts'}><Button>{lang?.continue}</Button></Link>
                </div>
                
                {/* <Table className="w-full border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-2">Email</TableHead>
                            <TableHead className="p-2">Token</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {noCorrect.map((item: any) => 
                            <TableRow key={item.email}>
                                <TableCell className="p-2 text-xs">{item.email}</TableCell>
                                <TableCell className="p-2 text-xs">{item.token}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table> */}
            </div>
            }
            
            
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  )
}
