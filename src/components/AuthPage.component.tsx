'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { AtSign, Loader2, Send, SquareAsterisk } from "lucide-react";

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
    console.log(data)
  }

  const { watch } = form
  const watchPrompt = watch("value")

  useEffect(() => {
    testValue()
  }, [watchPrompt]);

  function testValue () {
    if(typeData != 'onetimekey' && typeData != 'password'){
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

    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Card className="w-[400px]">
        <CardHeader className="items-start">
          <img src="/logo.svg" className="w-32 mb-3" alt="logo CloudFlare Helper" />
          <CardTitle className="mb-2">CloudFlare Helper</CardTitle>
          <CardDescription>This is a web assistant for managing domains from different accounts.</CardDescription>
          <div>
            <Link className="mr-2" href="https://t.me/cloudflareapi_bot">
              <Badge variant="secondary">Telegram Bot</Badge>
            </Link>
            <Link href="https://t.me/cfhelp_support">
              <Badge variant="secondary">Support</Badge>
            </Link>
          </div>
        </CardHeader>
        <CardContent className={loginLoading ? `loading` : ''}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin loading-animate"/>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {typeData == "password" ? 
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" type="password" {...field} />
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
                      <FormLabel>{typeData == 'onetimekey' ? "One-time key" : "Telegram ID or Email"}</FormLabel>
                    <FormControl>
                    {/* onetimekey */}
                      <Input icon={typeData == "none" ? "" : typeData == "telegram" ? <Send /> : typeData == "email" ? <AtSign /> : <SquareAsterisk />} placeholder={typeData == 'onetimekey'? "**********" : "mail@mail.ru"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              }
              
              <Button type="submit" className="w-full">Continue</Button>
            </form>
          </Form>
          <Button variant="outline" type="button" className="w-full mt-2" onClick={() => changeAuthMode()}>{typeData == 'onetimekey' ? "Login via TG or Email" : "Login via one-time key"}</Button>
        </CardContent>
      </Card>
    </div>
    )
}

export default AuthPage;