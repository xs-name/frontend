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
import { MoveLeft } from "lucide-react";

export default function SSL({ params }: any) {
  if (!params.id) {
    //http://localhost:3000/add-site/ed283e3987b1d606840ae88313d4ada0/2b1e83e4ba3dc3d1fecfc3c68e578861/dns
  }

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const { language, setLanguage } = useLanguageContext();
  const [lang, setLang] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (language) {
      axios
        .get(`/lang/${language}.json`)
        .then((res: any) => {
          setLang(res.data.add);
          // setLoadingWebsites(false)
        })
        .finally(() => setLoading(false));
    }
  }, [language]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {isAuthorized ? (
        <div>
          <Nav />
          <div className="pl-[260px] max-md:pl-[0px] transition-all pt-16 flex flex-col items-center">
            <div className="w-[1100px] max-2xl:w-full p-8">
              <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                wanddecisions.com
              </h1>
              <p className="leading-7">
                Управляйте DNS-записями вашего домена.
              </p>
              <Link
                className="font-medium text-primary text-sm flex gap-1 items-center mt-2 hover:text-primary/80"
                href={"/"}
              >
                <MoveLeft className="h-4" />
                Назад к веб-сайтам
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
