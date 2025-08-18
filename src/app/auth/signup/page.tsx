import { getCsrfToken } from "next-auth/react"
import SignUpForm from "./signup-form"
import Tokens from "csrf"
import settings from "@/settings"


export default async function SignUp() {
    const csrfToken = await getCsrfToken() || new Tokens().create(settings.csrfSecret)
    return <>
        <h1>회원가입</h1>   
        <SignUpForm csrfToken={csrfToken} />
    </>
}
