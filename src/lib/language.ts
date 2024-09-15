'use server'
import { cookies } from 'next/headers'
import { getUser } from './user'
import axios from 'axios'
import { config } from './utils'

export async function getLanguage() {
    // axios.get(process.env.NEXT_PUBLIC_API + '/account', config).then((res) => {
    //     console.log('result', res.data.result)
    //     return "en"
    // })

    // console.log(res.data.result)

    // if(res.data.result.length !== 0){
    //     console.log('res', res.data.result.language)
    //     return res.data.result.language
    // } else {
    //     console.log('en')
    //     return "en"
    // }
}

// export async function setCookieLanguage(lang: any) {
//     if(!lang){

//         cookies().set({
//             name: 'lang',
//             value: 'en',
//             httpOnly: true,
//             path: '/',
//         })

//     }else{

//         cookies().set({
//             name: 'lang',
//             value: lang,
//             httpOnly: true,
//             path: '/',
//         })

//     }
    

//     return lang
// }
