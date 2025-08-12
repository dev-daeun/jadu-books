"use client"

import { useActionState, useState } from "react";
import { createReview } from "@/services/reviews";
import { PostReviewResult, PostReviewResultType } from "@/types/review";
import styles from "./review-editor.module.css"


function ReviewEditorForm(
    {
        bookId,
        input,
        state,
        formAction,
        isPending,
        onChange,
        resultMessage
    }:
    {
        bookId: number,
        input: { author: string, content: string },
        state: PostReviewResult,
        formAction: any,
        isPending: boolean,
        onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
        resultMessage?: string,
    }
) {

    return (
        <section className={styles.form_container}>
            <form action={formAction}>
                <input name="bookId" value={bookId} readOnly hidden/>

                <div className={styles.input_area}>
                    <input name="author" value={input.author} onChange={onChange} disabled={isPending} placeholder="작성자 명" required/>
                    {state.validationError?.author ?  <p className={styles.author_warning_message}>{state.validationError?.author}</p> : ""}
                </div>

                <div className={styles.input_area}>
                    <textarea name="content" value={input.content} onChange={onChange} disabled={isPending} placeholder="리뷰 내용" required/>
                    {state.validationError?.content ?  <p className={styles.content_warning_message}>{state.validationError?.content}</p> : ""}
                </div>               
                
                { isPending ? <button type="submit" disabled={isPending} className={styles.deactivated_button}>작성 중</button> : <button type="submit" disabled={isPending} className={styles.activated_button}>작성하기</button> }
            </form>
            {resultMessage ? <h4>{resultMessage}</h4> : null}
        </section>
    )

}


export default function ReviewEditor({ bookId }: { bookId: number }) {
    const [input, setInput] = useState({author: "", content: ""})
    const [state, formAction, isPending] = useActionState(createReview, { result: PostReviewResultType.INITIAL });
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    switch (state.result) {
        case PostReviewResultType.BACKEND_ERROR:
            return <>
                <ReviewEditorForm formAction={formAction} bookId={bookId} input={input} state={state} onChange={onChange} isPending={isPending} resultMessage="리뷰 작성 과정에서 오류가 발생했습니다"/>
            </>
        case PostReviewResultType.SUCCEEDED:
            return <>
                <ReviewEditorForm formAction={formAction} bookId={bookId} input={input} state={state} onChange={onChange} isPending={isPending} resultMessage="리뷰가 작성되었습니다 🎉"/>
            </>
        default:
            return <ReviewEditorForm formAction={formAction} bookId={bookId} input={input} state={state} onChange={onChange} isPending={isPending}/>

    }
}