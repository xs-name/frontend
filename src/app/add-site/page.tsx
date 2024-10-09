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
import { getLanguage } from "@/lib/language";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { config, headers } from "@/lib/utils";
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Check, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Loader2, Search, X } from "lucide-react";
import { getUser } from "@/lib/user";
import { useUserContext } from "@/components/userProvider";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function StatusList({
  setOpen,
  setSelectedStatus,
  accounts,
  search,
  setSearch,
  paginate,
  page,
  lang
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: any) => void
  accounts: any,
  search: any,
  setSearch: any,
  paginate: any,
  page: any,
  lang: any
}) {


  return (
    <Command>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-none h-[45px]" icon={<Search className="w-4 h-4 absolute right-2 text-muted-foreground"/>} type="text" placeholder="example@example.com" required />
      {/* <CommandInput placeholder="Filter accounts..." /> */}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {accounts?.data?.map((status: any) => (
            <CommandItem
              className="h-[40px]"
              key={status.account_id}
              value={status.email}
              onSelect={(email) => {
                setSelectedStatus(
                  accounts.data.find((priority: any) => priority.email === email) || null
                )
                setOpen(false)
              }}
            >
              {status.email}
            </CommandItem>
          ))}
          <div className="flex items-center justify-between mt-3 gap-3 max-sm:flex-col">
            <div className="flex whitespace-nowrap text-sm text-muted-foreground">{page} {lang?.of} {accounts.all_page} {lang?.rows_selected}.</div>
            <div className="flex gap-2">
              <div onClick={() => paginate(1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                <ChevronsLeft className="w-[15px] h-[16px]"/>
              </div>
              <div onClick={() => paginate(page - 1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                <ChevronLeft className="w-[15px] h-[16px]"/>
              </div>
              <div onClick={() => paginate(page + 1)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                <ChevronRight className="w-[15px] h-[16px]"/>
              </div>
              <div onClick={() => paginate(accounts.all_page)} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 flex cursor-pointer">
                <ChevronsRight className="w-[15px] h-[16px]"/>
              </div>
            </div>
            {/* <div className="text-xs text-muted-foreground">Showing <strong>{DNS?.page?.page}-{DNS?.page?.total_pages}</strong> of <strong>{DNS?.page?.total_count}</strong> dns</div> */}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function ComboBoxResponsive({selectedAccount, setSelectedAccount, accounts, search, setSearch, lang, page, paginate}: any) {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 640)
    console.log(window.innerWidth > 640)
    console.log(window.innerWidth)
  }, [])

 
  if (isDesktop) {
    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-1">
              <Button onClick={() => setOpen(true)} variant="outline" className="w-full justify-start">
                {selectedAccount ? <>{selectedAccount.email}</> : <>Выбор аккаунта</>}
              </Button>
              {
                selectedAccount ?
                <X className="text-muted-foreground w-4 h-4" onClick={() => {
                  setSelectedAccount(null)
                }}/> : null
              }
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[384px] p-0" align="start">
            <StatusList paginate={paginate} lang={lang} page={page} search={search} setSearch={setSearch} accounts={accounts} setOpen={setOpen} setSelectedStatus={setSelectedAccount} />
          </PopoverContent>
        </Popover>
      </>
    )
  }
 
  return (
    <>
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      </DrawerTrigger>
      <DrawerContent className="pb-8">
        <div className="mt-4 border-t">
          <StatusList paginate={paginate} lang={lang} page={page} search={search} setSearch={setSearch} accounts={accounts} setOpen={setOpen} setSelectedStatus={setSelectedAccount} />
        </div>
      </DrawerContent>
    </Drawer>
    <div className="flex items-center gap-1">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-full justify-start">
        {selectedAccount ? <>{selectedAccount.email}</> : <>Выбор аккаунта</>}
      </Button>
      {
        selectedAccount ?
        <X className="text-muted-foreground w-4 h-4" onClick={() => {
          setSelectedAccount(null)
        }}/> : null
      }
    </div>
    </>
  )
}

export default function Home() {
  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [processLoading, setProcessLoading] = useState(false)

  const [domain, setDomain] = useState("");
  const [open, setOpen] = useState(false)

  const [width, setWidth] = useState(0);

  const [value, setValue] = useState("")
  
  const router = useRouter()

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [accounts, setAccounts] = useState<any>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null)



  function getAccounts(){
    axios.get(process.env.NEXT_PUBLIC_API + `/cf-accounts?size=20&page=${page}&email=${search}`, config).then((res:any) => {
      if(!res.data.error?.length){
        console.log(res.data.result[0])
        setAccounts(res.data.result[0])
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    })
  }

  useEffect(() => {
    console.log("getAccounts")
    getAccounts()
  }, [])

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
    setPage(1)
    getAccounts()
  }, [search])

  useEffect(() => {
    getAccounts()
  }, [page])

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.add)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

  function paginate(num: number){
    if(num > 0 && num <= accounts.all_page){
      setPage(num)
    }
  }


  function addDomain() {
    if(domain != ""){
      
      if(selectedAccount){
        const data = {
          name: [domain]
        }
        axios.post(process.env.NEXT_PUBLIC_API + `/zones/${selectedAccount.account_id}`, data, config).then((res:any) => {
          if(!res.data.error?.length){
            router.push(`/add-site/${res.data.result[0].result.result.account.id}/${res.data.result[0].result.result.id}/dns`)
          }else{
            toast(lang?.error, {
              description: res.data.error[0]?.message
            })
          }
        }).finally(() => setProcessLoading(false))
      } else{
        const data = {
          name: domain
        }
        axios.post(process.env.NEXT_PUBLIC_API + `/zones`, data, config).then((res:any) => {
          if(!res.data.error?.length){
            router.push(`/add-site/${res.data.result.account.id}/${res.data.result.id}/dns`)
            console.log(res.data)
          }else{
            toast(lang?.error, {
              description: res.data.error[0]?.message
            })
          }
        }).finally(() => setProcessLoading(false))
      }
    } else {
      toast(lang?.error, {
        description: "Enter an existing domain name"
      })
      setProcessLoading(false)
    }
  }

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {user.length != 0?
      <div>
        <Toaster />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="grid gap-2 mt-8 max-w-96 max-sm:max-w-full">
              <Label htmlFor="email">{lang?.label}</Label>
              <Input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full" type="text" placeholder="example.com" required />
              <ComboBoxResponsive setSelectedAccount={setSelectedAccount} selectedAccount={selectedAccount} lang={lang} page={page} paginate={paginate} search={search} setSearch={setSearch} accounts={accounts}/>
            </div>
            <div className="flex mt-8 max-w-96 items-center justify-between max-sm:flex-col max-sm:items-start max-sm:mt-4 max-sm:max-w-full">
              <Button className="max-sm:w-full" disabled={processLoading} onClick={() => {
                setProcessLoading(true)
                addDomain()
              }}>{processLoading? <div className="flex items-center gap-1 max-sm:w-full"><Loader2 className="animate-spin w-4 h-4"/> Загрузка</div> : lang?.button}</Button>
              {/* <Link className="font-medium text-primary underline" href={""}>{lang?.create_domain}</Link> */}
            </div>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}

