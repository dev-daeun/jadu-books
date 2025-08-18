import Link from "next/link";
import SignIn from "./signin-form";
import Tokens from "csrf";
import { getCsrfToken } from "next-auth/react";
import settings from "@/settings";


export default async function Page() {
    const csrfToken = await getCsrfToken() || new Tokens().create(settings.csrfSecret)
    return <>
        <SignIn csrfToken={csrfToken} />
        <Link href="/auth/signup">회원가입 하러가기</Link>
    </>
}
