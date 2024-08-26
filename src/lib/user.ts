import axios from "axios";
import { headers } from "./utils";


export async function getUser() {

    const config = {
        headers: headers
    };

    const res = await axios.get(process.env.NEXT_PUBLIC_API + '/account', config)

    let user:any = []

    if(!res.data.error){
        user = res.data.result
    }

    return user
}