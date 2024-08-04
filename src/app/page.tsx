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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  // const {language, setLanguage} = useLanguageContext();

  // useEffect(() => {
  //   console.log(language)
  // }, [language])

  return (
    <main>
      {isAuthorized?
      <div>
        <Nav />
        <Sitebar />
        <div className="pl-[260px] pt-16 flex flex-col items-center">
          <div className="w-[1100px] p-8">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">Домены</h1>
            <p className="leading-7">Выберите домен для настройки и мониторинга того, как Cloudflare обрабатывает его веб-трафик.</p>
            <div className="flex justify-between mt-8">
              <Input icon={<Search className="absolute right-2 text-muted-foreground cursor-pointer h-4"/>} type="text" placeholder="example.com" />
              <Button><Plus className="h-4 mr-1"/>Добавить домены</Button>
            </div>
            <div className="grid mt-8 gap-4 grid-cols-[repeat(_auto-fill,_minmax(320px,_1fr))]">
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/">
                <Card className="w-[100%] p-4">
                  <CardContent className="grid gap-4 p-0">
                    <p>wanddecisions.com</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm font-medium">
                        <Check className="text-lime-500 h-4"/>
                        Active
                      </div>
                      <FolderUp className="text-primary h-5"/>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      : <AuthPage />}
    </main>
  );
}
