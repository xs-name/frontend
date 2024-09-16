import axios from "axios";
import { config } from "./utils";


export async function getUser() {

    const res = await axios.get(process.env.NEXT_PUBLIC_API + '/account', config)

    let user:any = []


    if(res.data.error.length == 0){
        return res.data.result
    } else {
        return user
    }

}