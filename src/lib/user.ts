import axios from "axios";


export async function getUser() {
    const user = await axios.post(process.env.NEXT_PUBLIC_API + '/account')
    console.log(user)
    return user
}