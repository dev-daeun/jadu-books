"use client"


import { signUpAction } from "@/services/user";
import { FormSubmitResultType } from "@/types/form-submit";
import { SignUpResult } from "@/types/user";

import { useActionState, useState } from "react";
import styles from "./signup-form.module.css"
import { signIn } from "next-auth/react";


function SignUpForm(
    {
        csrfToken,
        input,
        state,
        formAction,
        isPending,
        onChange,
        backendErrorMessage,
    }:
    {
        csrfToken: string,
        input: { username: string, password: string, confirmPassword: string },
        state: SignUpResult,
        formAction: any,
        isPending: boolean,
        onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
        backendErrorMessage?: string,
    }
) {

    return (
        <section className={styles.form_container}>
            <form action={formAction}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} readOnly />

                <div className={styles.input_area}>
                    <label htmlFor="username">아이디 (영어 대소문자, 한글만 가능)</label>
                    <input name="username" value={input.username} onChange={onChange} disabled={isPending} placeholder="" required/>
                    {state.validationError?.username ?  <p className={styles.warning_message}>{state.validationError?.username}</p> : ""}
                </div>

                <div className={styles.input_area}>
                    <label htmlFor="password">비밀번호 (영어 대소문자, 숫자, 특수문자 1개 이상 조합 필수)</label>
                    <input type="password" name="password" value={input.password} onChange={onChange} disabled={isPending} placeholder="" required/>
                    {state.validationError?.password ?  <p className={styles.warning_message}>{state.validationError?.password}</p> : ""}
                </div>               
                
                <div className={styles.input_area}>
                    <label htmlFor="confirmPassword">비밀번호 재확인</label>
                    <input type="password" name="confirmPassword" value={input.confirmPassword} onChange={onChange} disabled={isPending} placeholder="" required/>
                    {state.validationError?.confirmPassword ?  <p className={styles.warning_message}>{state.validationError?.confirmPassword}</p> : ""}
                </div>         
    
                { isPending ? <button type="submit" disabled={isPending} className={styles.deactivated_button}>진행 중</button> : <button type="submit" disabled={isPending} className={styles.activated_button}>가입완료</button> }
                {backendErrorMessage ? <span>{backendErrorMessage}</span> : null}
            </form>
        </section>
    )

}


export default function SignUp({ csrfToken }: { csrfToken: string }) {
    const [input, setInput] = useState({username: "", password: "", confirmPassword: ""})
    const [state, formAction, isPending] = useActionState(signUpAction, { result: FormSubmitResultType.INITIAL });
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    switch (state.result) {
        case FormSubmitResultType.SUCCEEDED:
            signIn('credentials', {
                id: 1,
                username: state.data!.username,
                password: state.data!.password,
                redirect: false,
            }).then(() => {
                alert("회원가입이 완료되었습니다")
                window.location.href = "/"
            })
        case FormSubmitResultType.BACKEND_ERROR:
            return <SignUpForm formAction={formAction} csrfToken={csrfToken} input={input} state={state} onChange={onChange} isPending={isPending} backendErrorMessage="회원가입 과정에서 오류가 발생했습니다"/>
        default:
            return <SignUpForm formAction={formAction} csrfToken={csrfToken} input={input} state={state} onChange={onChange} isPending={isPending}/>
    }
}
