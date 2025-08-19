"use client"

import { useActionState, useState } from "react";
import { createReviewAction } from "@/services/reviews";
import { PostReviewResult } from "@/types/review";
import { FormSubmitResultType } from "@/types/form-submit";
import styles from "./review-form.module.css"
import { signIn, useSession } from "next-auth/react";


function ReviewEditorForm(
    {
        bookId,
        input,
        author,
        state,
        formAction,
        isPending,
        onChange,
        resultMessage
    }:
    {
        bookId: number,
        input: {  content: string },
        author: string,
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
                    <input name="author" value={author} disabled={isPending} placeholder="작성자 명" required readOnly/>
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


export default function ReviewEditor({ bookId}: { bookId: number }) {
    const [input, setInput] = useState({ content: ""})
    const [state, formAction, isPending] = useActionState(createReviewAction, { result: FormSubmitResultType.INITIAL });
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    const { data } = useSession()
    const author = data?.user?.name || ""

    switch (state.result) {
        case FormSubmitResultType.BACKEND_ERROR:
            return <>
                <ReviewEditorForm formAction={formAction} bookId={bookId} input={input} author={author} state={state} onChange={onChange} isPending={isPending} resultMessage="리뷰 작성 과정에서 오류가 발생했습니다"/>
            </>
        case FormSubmitResultType.SUCCEEDED:
            return <>
                <ReviewEditorForm formAction={formAction} bookId={bookId} input={input} author={author} state={state} onChange={onChange} isPending={isPending} resultMessage="리뷰가 작성되었습니다 🎉"/>
            </>
        default:
            if (data?.user) {
                return <ReviewEditorForm formAction={formAction} bookId={bookId} input={input} author={author} state={state} onChange={onChange} isPending={isPending}/>
            } else {
                return (
                    <>
                        <span>로그인 후 리뷰를 작성해주세요</span>
                        <button className={styles.login_button} onClick={() => signIn('credentials')}>로그인 하러가기</button>
                    </>
                )
            }

    }
}