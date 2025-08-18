"use server"

import { FormSubmitResultType } from "@/types/form-submit"
import { SignUpResult, signUpSchema, SignUpValidationError, SignUpSchemaKeys, signInSchema, SignInResult, SignInValidationError, SignInSchemaKeys } from "@/types/user"


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
        return { result: FormSubmitResultType.VALIDATION_FAILED, validationError: validationError }
    }
    
    return { result: FormSubmitResultType.SUCCEEDED, data: {id: "1", username: result.data.username, password: result.data.password} }
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
    
    return { result: FormSubmitResultType.SUCCEEDED, data: {id: "1", username: result.data.username, password: result.data.password} }
}