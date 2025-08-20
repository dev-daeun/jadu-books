import Link from "next/link";
import SignIn from "./signin-form";
import { getCsrfToken } from "@/app/util/csrf-token";
import styles from "./page.module.css"


export default async function Page() {
    const csrfToken = getCsrfToken()
    return <>
        <h1>로그인</h1>   
        <SignIn csrfToken={csrfToken} />
        <div className={styles.signup_link}>
            <span>아직 계정이 없으신가요?</span>
            <Link href="/auth/signup">회원가입 하러가기</Link>
        </div>
    </>
}
