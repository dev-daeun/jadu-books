"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.css"
import { useRouter } from "next/navigation"


export default function Modal({ children }: { children: React.ReactNode }) {
    console.log("### create modal start : ", new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
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
            <form method="dialog">
                <button>닫기</button>
            </form>
        </dialog>
    )
    console.log("### create modal end : ", new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    return createPortal(
         form,
        modalRoot,
    )
}
