"use client"

import { useActionState, useState } from "react";
import { createReview } from "@/services/reviews";
import { PostReviewResultType } from "@/types/review";
import styles from "./review-editor.module.css"


function ReviewEditorForm({ 
    bookId,
    input,
    formAction,
    onChange,
}: {
    bookId: number,
    input: { author: string, content: string },
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    formAction: any
}) {
    return (
        <section className={styles.form_container}>
            <form action={formAction}>
                <input name="bookId" value={bookId} readOnly hidden/>
                <textarea name="content" value={input.content} onChange={onChange} placeholder="리뷰를 입력하세요." required/>
                <div className={styles.submit_container}>
                    <input name="author" value={input.author} onChange={onChange} placeholder="작성자 이름을 입력하세요." required/>
                    <button type="submit">리뷰 작성</button>
                </div>
            </form>

        </section>
    )
}


export default function ReviewEditor({ bookId }: { bookId: number }) {
    const [input, setInput] = useState({author: "", content: ""})
    const [state, formAction] = useActionState(createReview, { result: PostReviewResultType.INITIAL });
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    switch (state.result) {
        case PostReviewResultType.INITIAL:
            return (
                <ReviewEditorForm
                    bookId={bookId}
                    input={input}
                    onChange={onChange}
                    formAction={formAction}
                />
            )
        case PostReviewResultType.VALIDATION_FAILED:
            return (
                <section>
                    <form action={formAction}>
                        <input name="bookId" value={bookId} readOnly hidden/>
                        <input name="content" value={input.content} onChange={onChange} placeholder="리뷰를 입력하세요." required/><p>{state.validationError?.content}</p>
                        <input name="author" value={input.author} onChange={onChange} placeholder="작성자 이름을 입력하세요." required/><p>{state.validationError?.author}</p>
                        <button type="submit">리뷰 작성</button>
                    </form>
                </section>
            )
        case PostReviewResultType.BACKEND_ERROR:
            return (
                <section>
                    <p>리뷰 작성 과정에 오류가 발생했습니다.</p>
                </section>
            )
        case PostReviewResultType.SUCCEEDED:
            return (
                <>
                    <p>리뷰 작성을 완료했습니다.</p>
                </>
            )

    }
}