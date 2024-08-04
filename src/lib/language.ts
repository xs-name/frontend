'use server'
import { cookies } from 'next/headers'

export async function getLanguage() {
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('lang')

    if(!hasCookie){
        return "en"
    } else {
        const lang:any = cookieStore.get('lang')
        return lang.value
    }
}

export async function setCookieLanguage(lang: any) {
    const cookieStore = cookies()

    cookies().set({
        name: 'lang',
        value: lang,
        httpOnly: true,
        path: '/',
    })

    return lang
}
