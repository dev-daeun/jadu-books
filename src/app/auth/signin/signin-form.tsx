"use client"


import { signInAction } from "@/services/user";
import { FormSubmitResultType } from "@/types/form-submit";
import { SignUpResult } from "@/types/user";

import { useActionState, useState } from "react";
import styles from "./signin-form.module.css"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


function SignInForm(
    {
        csrfToken,
        input,
        state,
        formAction,
        isPending,
        onChange,
    }:
    {
        csrfToken: string,
        input: { username: string, password: string },
        state: SignUpResult,
        formAction: any,
        isPending: boolean,
        onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    }
) {

    return (
        <section className={styles.form_container}>
            <form action={formAction}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} readOnly />

                <div className={styles.input_area}>
                    <label htmlFor="username">아이디</label>
                    <input name="username" value={input.username} onChange={onChange} disabled={isPending} placeholder="아이디를 입력하세요" required/>
                    {state.validationError?.username ?  <p className={styles.warning_message}>{state.validationError?.username}</p> : ""}
                </div>

                <div className={styles.input_area}>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" value={input.password} onChange={onChange} disabled={isPending} placeholder="비밀번호를 입력하세요" required/>
                    {state.validationError?.password ?  <p className={styles.warning_message}>{state.validationError?.password}</p> : ""}
                </div>                   
    
                { isPending ? <button type="submit" disabled={isPending} className={styles.deactivated_button}>진행 중</button> : <button type="submit" disabled={isPending} className={styles.activated_button}>로그인</button> }
            </form>
        </section>
    )

}


export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const [input, setInput] = useState({username: "", password: ""})
    const [state, formAction, isPending] = useActionState(signInAction, { result: FormSubmitResultType.INITIAL });
    const router = useRouter()
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }
    switch (state.result) {
        case FormSubmitResultType.SUCCEEDED:
            signIn('credentials', {
                username: state.data!.username,
                redirect: false,
            }).then(() => {
                router.back()
            })
            break
        case FormSubmitResultType.CSRF_ERROR:
            router.push("/error/forbidden")
            break
        case FormSubmitResultType.BACKEND_ERROR:
            return <>
                <SignInForm formAction={formAction} csrfToken={csrfToken} input={input} state={state} onChange={onChange} isPending={isPending}/>
                <span>로그인 과정에서 오류가 발생했습니다</span>
            </>
        default:
                return <SignInForm formAction={formAction} csrfToken={csrfToken} input={input} state={state} onChange={onChange} isPending={isPending}/>

    }
}
