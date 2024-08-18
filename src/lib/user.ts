import axios from "axios";


export async function getUser() {

    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_API + '/account',
        headers: { }
    };
      
    const user = await axios(config)
    // const user = await axios.get(process.env.NEXT_PUBLIC_API + '/account')
    console.log(user)
    return user
}