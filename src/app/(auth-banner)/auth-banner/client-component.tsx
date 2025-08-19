"use client"

import { signIn, signOut } from "next-auth/react"
import styles from "./client-component.module.css"


export function SignInBanner() {
    return <div className={styles.banner} onClick={() => signIn()}>로그인</div>
}

export function SignOutBanner() {
    return <div className={styles.banner} onClick={() => signOut()}>로그아웃</div>
}
