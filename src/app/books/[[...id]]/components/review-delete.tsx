"use client"


import { useActionState, useRef } from "react"
import { PostReviewResultType } from "@/types/review"
import { deleteReviewAction } from "@/services/reviews"
import { useEffect } from "react"


export default function ReviewDelete({ reviewId, bookId }: { reviewId: number, bookId: number }) {
    const [state, formAction, isPending] = useActionState(deleteReviewAction, { result: PostReviewResultType.INITIAL });
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.result === PostReviewResultType.BACKEND_ERROR) {
            alert("리뷰 삭제 과정에서 오류가 발생했습니다.")
        }
    }, [state])

    const onClick = () => {
        if (confirm("리뷰를 삭제하시겠습니까?")) {
            formRef.current?.requestSubmit()
        }
    }
    return (
        <form ref={formRef} action={formAction}>
            <input name="reviewId" value={reviewId} readOnly hidden/>
            <input name="bookId" value={bookId} readOnly hidden/>
            { isPending ? <div>...</div> : <div style={{cursor: "pointer"}} onClick={onClick}>삭제</div> }
        </form>
    )
}
