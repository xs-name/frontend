/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import AuthPage from "@/components/AuthPage.component";
import { useLanguageContext } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import { Sitebar } from "@/components/Sitebar.components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, config } from "@/lib/utils";
import { Check, Clock, FolderUp, Loader2, OctagonAlert, Plus, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Loading } from "@/components/Loading.components";
import { Skeleton } from "@/components/ui/skeleton";
import { getLanguage } from "@/lib/language";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";
import { TariffModal } from "@/components/TariffModal.component";

export default function Home() {
  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [loading1, setLoading1] = useState(true)
  const [loadingWebsites, setLoadingWebsites] = useState(true)

  //Храним все домены
  const [domains, setDomains] = useState([]);
  const [domainsAll, setDomainsAll] = useState([]);
  const [domainsVisible, setDomainsVisible] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState("");

  const [tariffModal, setTariffModal] = useState(false);

  useEffect(() => {
    loadingPage()
  }, [language])

  useEffect(() => {
    loadingPage()
    getUser().then(res => {
      if(res.length != 0){
        setLanguage(res.language)
      } else {
        setLanguage('en')
      }
      setUser(res)
    })
  }, [])

  function loadingPage() {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.home)
      }).finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    const domainsTemp = Array.from(domains);
    setDomainsVisible(domainsTemp.splice((page - 1) * 12, 12))
  }, [page])

  function filterByCity(arr: any, name: any) {
    return arr.filter(function(item: any, i: any, arr: any) {
      // console.log(item.name.includes(name))
      return (item.name.includes(name.toLowerCase()));
    });
  };

  useEffect(() => {
    var tempDomains = filterByCity(domainsAll, search);
    setPage(1)
    setDomainsVisible(tempDomains.splice(0, 12))
    setDomains(tempDomains)
    setMaxPage(Math.ceil(tempDomains.length / 12))
  }, [search])

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API + `/zones`, config).then((res:any) => {
      if(!res.data.error?.length){
        if(res.data.result.length > 0){
          const revers = res?.data?.result?.sort((a:any, b:any) => {
            let one :any = new Date(b.created_on)
            let two :any = new Date(a.created_on)
            return one - two
          });
          const domainsTemp:any = Array.from(res.data.result);
          setDomainsAll(res.data.result)
          setDomains(res.data.result)
          setDomainsVisible(domainsTemp.splice(0, 12))
          setMaxPage(Math.ceil(res.data.result.length / 12))
        }
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    }).finally(() => {
      setLoading1(false)
      setLoadingWebsites(false)
    });
  }, [])

  if(loading || loading1){
    return <Loading />
  }

  return (
    <main>
      {user.length != 0?
      <div>
        <TariffModal active={tariffModal} setActive={setTariffModal}/>
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="flex justify-between mt-8 max-sm:flex-col max-sm:gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="example.com"
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link href="/add-site"><Button className="max-sm:w-full"><Plus className="h-4 mr-1"/>{lang?.button_add}</Button></Link>
            </div>
            <div className="grid mt-8 gap-4 grid-cols-[repeat(_auto-fill,_minmax(320px,_1fr))] max-sm:grid-cols-none">
              {domainsVisible.map((el:any) =>
                <Link href={`/websites/${el.account.id}/${el.id}/dns`} key={el.id}>
                  <Card className="w-[100%] p-4">
                    <CardContent className="grid gap-4 p-0">
                      <p>{el.name}</p>
                      <div className="flex items-center justify-between">
                        {el.status == "active" ?
                          <div className="flex items-center text-sm font-medium">
                            <Check className="text-lime-500 h-4"/>
                            {lang?.active}
                          </div>
                        :
                        el.status == "pending" ?
                        <div className="flex items-center text-sm font-medium">
                          <Clock className="text-blue-600 h-4"/>
                          Pending Nameserver Update
                        </div>
                        :
                        el.status == "moved" ?
                        <div className="flex items-center text-sm font-medium">
                          <OctagonAlert className="text-red-600 h-4"/>
                          Moved
                        </div>
                        :
                        <div className="flex items-center text-sm font-medium">
                          {el.status}
                        </div>
                        }
                        
                        <div className="flex items-center gap-2">
                          {el.alerts == "import" ? <FolderUp className="text-primary h-5"/> : null}
                          {/* {el.alerts.map((item: any) => {
                            item == "import" ? <FolderUp key={item} className="text-primary h-5"/> : null
                          })} */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
              {domainsVisible.length == 0 && !loadingWebsites ? <div className="flex gap-2 items-center"><SearchX /> {lang?.not}</div> : null}
              {loadingWebsites ? <div className="flex gap-2 items-center"><Loader2 className="animate-spin w-5 h-5"/> {lang?.loading}</div> : null}
            </div>
            {/* domainsVisible */}
            {maxPage > 3 ? 
              <Pagination className="mt-6">
                <PaginationContent>
                  {page != 1 ? 
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => setPage(page == 1? page : page-1)}/>
                  </PaginationItem> : null}

                  {page > maxPage - 2 ?
                    <>
                    <PaginationItem className="cursor-pointer">
                      <PaginationLink onClick={() => setPage(1)} isActive={page == 1}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="cursor-pointer">
                      <PaginationEllipsis />
                    </PaginationItem></> : null
                  }
                  
                  <PaginationItem className="cursor-pointer">
                    <PaginationLink onClick={() => setPage(page == maxPage ? page - 2 : page == 1? page : page == maxPage - 2 ? 1 : page - 1)} isActive={page == 1}>
                      {page == maxPage ? page - 2 : page == 1? page : page == maxPage - 2 ? 1 : page - 1}
                    </PaginationLink>
                  </PaginationItem>

                  {page == maxPage - 2 ? 
                    <PaginationItem className="cursor-pointer">
                      <PaginationEllipsis />
                    </PaginationItem> : null
                  }

                  {page == maxPage - 2 ? 
                    <PaginationItem className="cursor-pointer">
                      <PaginationLink onClick={() => setPage(maxPage - 3)}>
                        {maxPage - 3}
                      </PaginationLink>
                    </PaginationItem> : null
                  }

                  <PaginationItem className="cursor-pointer">
                    <PaginationLink onClick={() => setPage(page == maxPage ? page - 1 : page == 1? page + 1 : page == maxPage - 2? maxPage - 2 : page)} isActive={page != 1 && page != maxPage}>
                      {page == maxPage ? page - 1 : page == 1? page + 1 : page == maxPage - 2 ? maxPage - 2 : page}
                    </PaginationLink>
                  </PaginationItem>
                  
                  <PaginationItem className="cursor-pointer">
                    <PaginationLink onClick={() => setPage(page == 1? page + 2 : page == maxPage ? page : page + 1)} isActive={page == maxPage}>
                      {page == 1? page + 2 : page == maxPage ? page : page + 1}
                    </PaginationLink>
                  </PaginationItem>

                  {page < maxPage - 2 ? 
                    <PaginationItem className="cursor-pointer">
                      <PaginationEllipsis />
                    </PaginationItem> : null
                  }
                  {page < maxPage - 1 ? 
                    <PaginationItem className="cursor-pointer">
                      <PaginationLink onClick={() => setPage(maxPage)}>{maxPage}</PaginationLink>
                    </PaginationItem> : null
                  }
                  
                  {page != maxPage? 
                    <PaginationItem className="cursor-pointer">
                      <PaginationNext onClick={() => setPage(maxPage == page ? page : page + 1)} />
                    </PaginationItem> : null
                  }
                  
                </PaginationContent>
              </Pagination>
              :
              <Pagination className="mt-6">
                <PaginationContent>
                  {maxPage > 1 ? 
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(1)} isActive={page == 1}>
                      1
                    </PaginationLink>
                  </PaginationItem> : null
                  }

                  {maxPage >= 2 ? 
                    <PaginationItem>
                    <PaginationLink onClick={() => setPage(2)} isActive={page == 2}>
                      2
                    </PaginationLink>
                  </PaginationItem> : null
                  }
                  
                  {maxPage == 3 ? 
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(3)} isActive={page == 3}>
                      3
                    </PaginationLink>
                  </PaginationItem> : null
                  }
                </PaginationContent>
              </Pagination>
            }
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
