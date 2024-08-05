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
import { cn } from "@/lib/utils";
import { Check, FolderUp, Plus, Search } from "lucide-react";
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

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)

  //Храним все домены
  const [domains, setDomains] = useState([]);
  const [domainsVisible, setDomainsVisible] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(language){
        axios.get(`/lang/${language}.json`).then((res:any) => {
          setLang(res.data.home)
          setLoading(false)
        });
    }
  }, [language])

  useEffect(() => {
    axios.get(`/test.json`).then((res:any) => {
      if(res.data.status){
        setDomains(res.data.result)
        setDomainsVisible(res.data.result.splice(0, 12))
        console.log(res.data.result.splice(0, 12))
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    });
  }, [])

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {isAuthorized?
      <div>
        <Nav />
        <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
          <div className="w-[1100px] max-2xl:w-full p-8">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{lang?.title}</h1>
            <p className="leading-7">{lang?.description}</p>
            <div className="flex justify-between mt-8 max-sm:flex-col max-sm:gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="example.com"
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
              <Button><Plus className="h-4 mr-1"/>{lang?.button_add}</Button>
            </div>
            <div className="grid mt-8 gap-4 grid-cols-[repeat(_auto-fill,_minmax(320px,_1fr))] max-sm:grid-cols-none">
              {domainsVisible.map((el:any) => 
                <Link href="/" key={el.id}>
                  <Card className="w-[100%] p-4">
                    <CardContent className="grid gap-4 p-0">
                      <p>wanddecisions.com</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium">
                          <Check className="text-lime-500 h-4"/>
                          {lang?.active}
                        </div>
                        <FolderUp className="text-primary h-5"/>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
            <Pagination className="mt-6">
              
              <PaginationContent>
                {page != 1 ? 
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(page-1)}/>
                </PaginationItem> : null}
                
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page == 1? page : page == Math.ceil(domains.length / 12) - 2 ? 1 : page - 1)} isActive={page == 1}>{page == 1? page : page == Math.ceil(domains.length / 12) - 2 ? 1 : page - 1}</PaginationLink>
                </PaginationItem>

                {page == Math.ceil(domains.length / 12) - 2 ? 
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem> : null
                }

                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page == 1? page + 1 : page == Math.ceil(domains.length / 12) - 2? Math.ceil(domains.length / 12) - 2 : page)} isActive={page != 1 && page != Math.ceil(domains.length / 12)}>
                    {page == 1? page + 1 : page == Math.ceil(domains.length / 12) - 2 ? Math.ceil(domains.length / 12) - 2 : page}
                  </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page == 1? page + 2 : page == Math.ceil(domains.length / 12) - 1 ? Math.ceil(domains.length / 12) : page + 1)} isActive={page == Math.ceil(domains.length / 12)}>
                    {page == 1? page + 2 : page == Math.ceil(domains.length / 12) ? page - 1 : page + 1}
                  </PaginationLink>
                </PaginationItem>

                {page < Math.ceil(domains.length / 12) - 2 ? 
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem> : null
                }
                {page < Math.ceil(domains.length / 12) - 1 ? 
                  <PaginationItem>
                    <PaginationLink href="#">{Math.ceil(domains.length / 12)}</PaginationLink>
                  </PaginationItem> : null
                }
                
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(page+1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            {page} - {Math.ceil(domains.length / 12) }
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
