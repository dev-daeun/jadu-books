"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.css"
import { useRouter } from "next/navigation"


export default function Modal({ children }: { children: React.ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const router = useRouter()
    const onClose = () => {
        router.back()
    }
    const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if ((e.target as HTMLElement).nodeName === "DIALOG") {  // 모달창 바깥 클릭 시 nodeName === "DIALOG"
            router.back()
        }
    }

    useEffect(() => {
        if (dialogRef.current && !dialogRef.current.open) {
            dialogRef.current.showModal()
            dialogRef.current?.scrollTo({
                top: 0  // 스크롤 최상단에 고정
            })
        }
    }, [])

    const modalRoot = document.getElementById("modal-root") as HTMLElement
    const form = (
        <dialog onClick={onClick} onClose={onClose} ref={dialogRef} className={styles.modal}>
            {children}
            <form method="dialog"></form>
        </dialog>
    )
    return createPortal(
         form,
        modalRoot,
    )
}
