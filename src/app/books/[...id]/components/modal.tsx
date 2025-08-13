"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.css"


export default function Modal({ children }: { children: React.ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        if (dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal()
            dialogRef.current?.scrollTo({
                top: 0  // 스크롤 최상단에 고정
            })
        }
    }, [])
    return createPortal(<dialog ref={dialogRef} className={styles.modal}>{children}</dialog>, document.getElementById("modal-root") as HTMLElement)
}
