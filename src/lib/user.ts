import axios from "axios";


export async function getUser() {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '03ec91dc-c802-46b1-9cb1-4df06e40cb36'
        }
    };

    const res = await axios.get(process.env.NEXT_PUBLIC_API + '/account', config)

    let user:any = []

    if(!res.data.error){
        user = res.data.result
    }

    return user
}