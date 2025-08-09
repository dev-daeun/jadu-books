"use client"

import { useRouter } from "next/navigation";
import { useEffect, startTransition } from "react"
import styles from "./error.module.css"

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    const router = useRouter()
    const onButtonClick = () => {
        startTransition(() => {
            router.refresh()
            reset()
        })
    }
    useEffect(() => { console.error(error) }, [error])
    return (
    <div className={styles.container}>
        <p>오류가 발생했습니다. 페이지를 새로고침하세요.</p>
        <button className={styles.refresh_button} onClick={onButtonClick}>새로고침</button>
    </div>)
}