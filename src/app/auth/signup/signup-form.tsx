"use client"


import { signUpAction } from "@/services/user";
import { FormSubmitResultType } from "@/types/form-submit";
import { SignUpResult } from "@/types/user";

import { useActionState, useState } from "react";
import styles from "./signup-form.module.css"


function SignUpForm(
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
        input: { username: string, password: string, confirmPassword: string },
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
                    <label htmlFor="password">비밀번호 (영어 대소문자, 숫자, 특수문자 1개 이상 조합 필수)</label>
                    <input type="password" name="password" value={input.password} onChange={onChange} disabled={isPending} placeholder="비밀번호를 입력하세요" required/>
                    {state.validationError?.password ?  <p className={styles.warning_message}>{state.validationError?.password}</p> : ""}
                </div>               
                
                <div className={styles.input_area}>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input type="password" name="confirmPassword" value={input.confirmPassword} onChange={onChange} disabled={isPending} placeholder="비밀번호를 한 번 더 입력하세요" required/>
                    {state.validationError?.confirmPassword ?  <p className={styles.warning_message}>{state.validationError?.confirmPassword}</p> : ""}
                </div>         
    
                { isPending ? <button type="submit" disabled={isPending} className={styles.deactivated_button}>진행 중</button> : <button type="submit" disabled={isPending} className={styles.activated_button}>가입완료</button> }
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
            window.location.href = "/"
        default:
            return <SignUpForm formAction={formAction} csrfToken={csrfToken} input={input} state={state} onChange={onChange} isPending={isPending}/>

    }
}
