"use server"

import redis from "@/app/util/redis"
import { FormSubmitResultType } from "@/types/form-submit"
import { SignUpResult, signUpSchema, SignUpValidationError, SignUpSchemaKeys, signInSchema, SignInResult, SignInValidationError, SignInSchemaKeys } from "@/types/user"


// TODO : 비즈니스 로직 담당하는 백엔드 서버에 persistance layer 적용, 해당 백엔드 서버 API 호출
async function userCreated(username: string, password: string): Promise<boolean> {
    const result = await redis.setnx(`user:${username}`, `password:${password}`)
    return Boolean(result)
}

async function getUser(username: string): Promise<string | null> {
    return await redis.get(`user:${username}`)
}



export async function signUpAction(previousState: SignUpResult, formData: FormData): Promise<SignUpResult> {
    const result = signUpSchema.safeParse({
        username: formData.get("username")?.toString(),
        password: formData.get("password")?.toString(),
        confirmPassword: formData.get("confirmPassword")?.toString(),
    })
    if (!result.success) {
        const validationError: SignUpValidationError = {}
        for (const err of result.error.issues) {
            validationError[err.path[0] as SignUpSchemaKeys] = err.message
        }
        return { 
            result: FormSubmitResultType.VALIDATION_FAILED,
            validationError: validationError
        }
    }

    try {
        const created = await userCreated(result.data.username, result.data.password)
        if (!created) {
            return { 
                result: FormSubmitResultType.VALIDATION_FAILED,
                validationError: {username: "이미 존재하는 아이디입니다."},
             }
        }
    } catch (err) {
        console.error("Error occurred while creating user: ", err)
        return { result: FormSubmitResultType.BACKEND_ERROR }
    }

    return { 
        result: FormSubmitResultType.SUCCEEDED,
        data: { username: result.data.username, password: result.data.password },
     }


}


export async function signInAction(previousState: SignInResult, formData: FormData): Promise<SignInResult> {
    const result = signInSchema.safeParse({
        username: formData.get("username")?.toString(),
        password: formData.get("password")?.toString(),
    })
    if (!result.success) {
        const validationError: SignInValidationError = {}
        for (const err of result.error.issues) {
            validationError[err.path[0] as SignInSchemaKeys] = err.message
        }
        return { result: FormSubmitResultType.VALIDATION_FAILED, validationError: validationError }
    }

    try {
        const exists: string | null = await getUser(result.data.username)
        if (!exists) {
            return { result: FormSubmitResultType.VALIDATION_FAILED, validationError: {username: "존재하지 않는 아이디입니다."} }
        }

        const password = exists.split(":")[1]
        if (password !== result.data.password) {
            return { result: FormSubmitResultType.VALIDATION_FAILED, validationError: {password: "비밀번호가 일치하지 않습니다."} }
        }
    } catch (err) {
        console.error("Error occurred while checking user existence: ", err)
        return { result: FormSubmitResultType.BACKEND_ERROR }
    }
    
    return { result: FormSubmitResultType.SUCCEEDED, data: {username: result.data.username, password: result.data.password} }
}