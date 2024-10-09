'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loading } from "./Loading.components";
import { useLanguageContext } from "./LanguageProvider";
import axios from 'axios';
import { Toaster } from "@/components/ui/sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Mail, Loader2, Send, SquareAsterisk, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { getLanguage } from "@/lib/language";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { config } from "@/lib/utils";

const loginSchema = z.object({
  value: z.string().min(1, {
    message: "Пожалуйста, заполните это поле!",
  })
})

const AuthPage = () => {
  const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const TELEGRAM_ID = /^([,\s]*\b[0-9]{6,100}\b[,\s]*)*$/
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [typeData, setTypeData] = useState('none');
  const [inpitPassword, setInpitPassword] = useState(true);
  const [loading, setLoading] = useState(true)
  const {language, setLanguage} = useLanguageContext()
  const [lang, setLang] = useState<any>();

  const router = useRouter()


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      value: ""
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const data: any = values
    data.type = typeData
    // console.log(data)

    switch(data.type){
      case 'email':
        data.value = data.value.toLowerCase()
        axios.post(process.env.NEXT_PUBLIC_API + '/account/authorization/login', JSON.stringify(data), config).then((res) => {
          if(res.data.error.length > 0){
            toast(lang?.error, {
              description: res.data.error[0].message,
            })
          } else {
            if(res.data.result[0].step){
              setTypeData('password')
              form.setValue("value", "")
            }
          }
        })
        break
      case 'password':
        axios.post(process.env.NEXT_PUBLIC_API + '/account/authorization/login', data, config).then((res) => {
          if(res.data.error.length > 0){
            toast(lang?.error, {
              description: res.data.error[0].message,
            })
          } else {
            // console.log(res.data)
            if(res.data.result[0].type == "redirect"){
              router.push(res.data.result[0].location)
            }
          }
        })
        break
      case 'telegram':
        axios.post(process.env.NEXT_PUBLIC_API + '/account/authorization/login', JSON.stringify(data), config).then((res) => {
          if(res.data.error.length > 0){
            toast(lang?.error, {
              description: res.data.error[0].message,
            })
          } else {
            if(res.data.result[0].step){
              setTypeData('tgpassword')
              form.setValue("value", "")
            }
          }
        })
        break
      case 'tgpassword':
          axios.post(process.env.NEXT_PUBLIC_API + '/account/authorization/login', data, config).then((res) => {
            if(res.data.error.length > 0){
              toast(lang?.error, {
                description: res.data.error[0].message,
              })
            } else {
              // console.log(res.data)
              if(res.data.result[0].type == "redirect"){
                router.push(res.data.result[0].location)
              }
            }
          })
        break
    }
  }

  const { watch } = form
  const watchPrompt = watch("value")

  useEffect(() => {
    if(language){
      axios.get(`/lang/${language}.json`).then((res:any) => {
        setLang(res.data.auth)
      }).finally(() => setLoading(false));
    }
  }, [language])

  useEffect(() => {
    getLanguage().then(res => {
      setLanguage(res)
    })
  }, [])

  useEffect(() => {
    testValue()
  }, [watchPrompt]);

  function testValue () {
    if(typeData != 'onetimekey' && typeData != 'password' && typeData != 'tgpassword'){
      if(EMAIL_REGEXP.test(watchPrompt)){
        setTypeData('email')
      }else if(TELEGRAM_ID.test(watchPrompt) && watchPrompt.length >= 6){
        setTypeData('telegram')
      }else{
        setTypeData('none')
      }
    }
  }

  function changeAuthMode () {
    setLoginLoading(true)
    setTimeout(() => {
      if(typeData == 'onetimekey'){
        setTypeData('none')
        testValue()
      } else {
        setTypeData('onetimekey')
      }
      setLoginLoading(false)
    }, 500)
  }

 

  if(loading){
    return <Loading />
  }

    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Toaster />
        <Card className="w-[400px]">
        <CardHeader className="items-start">
          <img src="/logo.svg" className="w-24 mb-3" alt="logo CloudFlare Helper" />
          <CardTitle className="mb-2">{lang?.name}</CardTitle>
          <CardDescription>{lang?.description}</CardDescription>
          <div>
            <Link className="font-medium text-primary underline-offset-4" href="https://t.me/cloudflareapi_bot">
              {lang?.bot}
            </Link>
            <span className="leading-7 [&:not(:first-child)]:mt-6"> & </span>
            <Link className="font-medium text-primary underline-offset-4" href="https://t.me/cfhelp_support">
              {lang?.support}
            </Link>
          </div>
        </CardHeader>
        <CardContent className={loginLoading ? `loading` : ''}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin loading-animate"/>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {typeData == "password" || typeData == "tgpassword" ? 
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel>{lang?.password}</FormLabel>
                    <FormControl>
                      <Input icon={inpitPassword ? <Eye onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" /> : <EyeOff onClick={() => setInpitPassword(!inpitPassword)} className="absolute right-2 text-muted-foreground cursor-pointer" />} placeholder={lang?.password} type={inpitPassword ? "password" : "text"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              :
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel>{typeData == 'onetimekey' ? lang?.loginLabelTwo : lang?.loginLabelOne}</FormLabel>
                    <FormControl>
                    {/* onetimekey */}
                      <Input icon={typeData == "none" ? "" : typeData == "telegram" ? <Send className="absolute right-2 text-muted-foreground" /> : typeData == "email" ? <Mail className="absolute right-2 text-muted-foreground" /> : <SquareAsterisk className="absolute right-2 text-muted-foreground" />} placeholder={typeData == 'onetimekey'? "**********" : "mail@mail.ru"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              }
              
              <Button type="submit" className="w-full">{lang?.continue}</Button>
            </form>
          </Form>
          <div className="flex gap-2">
            {typeData == 'password' || typeData == "tgpassword" ? <Button variant="outline" type="button" className="w-full mt-2" onClick={() => {
              setTypeData("none")
              form.setValue("value", "")
            }}><ArrowLeft className="w-4 mr-1"/>{lang?.back}</Button> : null}
            {/* <Button variant="outline" type="button" className="w-full mt-2" onClick={() => changeAuthMode()}>{typeData == 'onetimekey' ? lang?.loginTypeOne : lang?.loginTypeTwo}</Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
    )
}

export default AuthPage;