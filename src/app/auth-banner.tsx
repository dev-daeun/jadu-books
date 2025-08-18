"use client"

import { User } from "next-auth"
import { signIn, signOut } from "next-auth/react"


export default function AuthBanner({user}: {user: User | undefined }) {
    if (user) {
        return <div onClick={() => signOut()}>로그아웃</div>
    }
    else {
        return <div onClick={() => signIn()}>로그인</div>
    }
}
