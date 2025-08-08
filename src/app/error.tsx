"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => { console.error(error) }, [error])
    return (<p>Next.js 서버에서 오류가 발생했습니다. Next.js 애플리케이션 로그를 확인하세요.</p>)
}