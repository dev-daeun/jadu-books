"use client"  // 클라이언트 컴포넌트 디렉티브


import React, { useState } from "react"
import { useRouter } from "next/navigation";
import styles from "./page.module.css"


export default function Page() {
    const router = useRouter();
    const [searchWord, setSearchWord] = useState("")
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
    }
    const onButtonClick = () => {
        router.push(`/search?q=${searchWord}`)
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/search?q=${searchWord}`)
        }
    }
    return (
        <div className={styles.searchbar_container}>
            <input value={searchWord} onChange={onInputChange} onKeyDown={onKeyDown}/>
            <button onClick={onButtonClick}>검색</button>
        </div>
    )
}