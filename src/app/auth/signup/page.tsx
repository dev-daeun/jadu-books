import SignUpForm from "./signup-form"
import { getCsrfToken } from "@/app/util/csrf-token"


export default async function SignUp() {
    const csrfToken = getCsrfToken()
    return <>
        <h1>회원가입</h1>   
        <SignUpForm csrfToken={csrfToken} />
    </>
}
