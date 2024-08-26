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
import { Check, FolderUp, Loader2, Plus, Search, SearchX } from "lucide-react";
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

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const {user, setUser} = useUserContext();
  const {language, setLanguage} = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true)
  const [loadingWebsites, setLoadingWebsites] = useState(true)

  //Храним все домены
  const [domains, setDomains] = useState([]);
  const [domainsAll, setDomainsAll] = useState([]);
  const [domainsVisible, setDomainsVisible] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.home)
        // setLoadingWebsites(false)
      }).finally(() => setLoading(false));
    }
  }, [language])

  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  useEffect(() => {
    getUser().then(res => {
      setUser(res)
    })
  }, [])

  useEffect(() => {
    const domainsTemp = Array.from(domains);
    setDomainsVisible(domainsTemp.splice((page - 1) * 12, 12))
  }, [page])

  function filterByCity(arr: any, name: any) {
    return arr.filter(function(item: any, i: any, arr: any) {
      // console.log(item.name.includes(name))
      return (item.name.includes(name));
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
    axios.get(`/test.json`).then((res:any) => {
      if(res.data.status){
        setDomainsAll(res.data.result)
        setDomains(res.data.result)
        setDomainsVisible(res.data.result.splice(0, 12))
        setMaxPage(Math.ceil(res.data.result.length / 12))
        setLoadingWebsites(false)
      }else{
        //* ВЫДАТЬ ОШИБКУ ПОЛЬЗОВАТЕЛЮ!!!
      }
    })
  }, [])

  if(loading){
    return <Loading />
  }

  return (
    <main>
      {user.length == 0?
      <div></div>
      : <AuthPage />}
    </main>
  );
}
