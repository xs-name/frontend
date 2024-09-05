/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import AuthPage from "@/components/AuthPage.component";
import { useLanguageContext } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading.components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, MoveLeft } from "lucide-react";
import { getLanguage } from "@/lib/language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { headers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useUserContext } from "@/components/userProvider";
import { getUser } from "@/lib/user";

export default function SSL() {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const {user, setUser} = useUserContext();
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then(res => {
      setUser(res)
    })
  }, [])


  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.ssl);
          // setLoadingWebsites(false)
        })
        .finally(() => setLoading(false));
    }
  }, [language]);

  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  if (loading) {
    return <Loading />;
  }


  return (
    <main>
      {isAuthorized ? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8 max-sm:p-4">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Account</h1>
              <p className="leading-7 mb-5">
                Customize your edge certificates, which encrypt traffic.
              </p>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">Language Preference</p>
                  <p className="mt-3 mb-3">My preference for the language shown in the dashboard is:</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Select value={user?.language}>
                    <SelectTrigger className="w-[150px] mt-1" defaultValue="1.0">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">Email Address</p>
                  <p className="mt-3 mb-3">{user?.email}</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Button>Change Email Address</Button>
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">Password</p>
                  <p className="mt-3 mb-3">You can change your password</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Button>Change Password</Button>
                </div>
              </div>

              <div className="flex border rounded-md mb-8 max-lg:flex-col">
                <div className="p-5 w-2/3 max-lg:w-full">
                  <p className="text-xl font-semibold">Telegram</p>
                  <p className="mt-3 mb-3">{user?.telegram}</p>
                </div>
                <div className="border-l bg-slate-100 w-1/3 flex items-center justify-center max-lg:w-full max-lg:h-20 max-lg:border-t max-lg:border-l-0">
                  <Button>Change Telegram</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
