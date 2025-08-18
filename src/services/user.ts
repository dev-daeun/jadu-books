import { FormSubmitResultType } from "@/types/form-submit"
import { SignUpResult, signUpSchema, SignUpValidationError, SignUpSchemaKeys } from "@/types/user"
import { signIn } from "next-auth/react"


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
    
    await signIn('credentials', {
        id: 1,
        username: result.data.username,
        password: result.data.password,
        redirect: false,
    })
    return { result: FormSubmitResultType.SUCCEEDED, data: {id: 1, username: result.data.username, password: result.data.password} }
}