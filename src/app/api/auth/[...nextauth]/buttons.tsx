"use client"

import { useSession, signIn, signOut } from "next-auth/react"


export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>회원가입</button>
      <button onClick={() => signIn()}>로그인</button>
    </>
  )
}