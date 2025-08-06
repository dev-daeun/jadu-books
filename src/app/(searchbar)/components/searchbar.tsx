"use client"  // 클라이언트 컴포넌트 디렉티브


import React, { useState } from "react"


export default function SearchBar() {
    const [searchWord, setSearchWord] = useState("")
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value)
    }

    return (
        <div>
            <input value={searchWord} onChange={onInputChange}/>
            <button>검색</button>
        </div>
    )
}