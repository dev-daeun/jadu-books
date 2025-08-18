import { z } from "zod"
import ApiResponse from "./api-response"
import { FormSubmitResultType } from "./form-submit"


export const signUpSchema = z.object({
    username: z.string()
    .min(2, '아이디는 최소 2글자 이상이어야 합니다')
    .max(10, '아이디는 최대 10글자까지 가능합니다')
    .regex(/[a-zA-Z가-힣]+$/, '아이디는 영어 대소문자와 한글만 허용합니다'),

    password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .max(24, '비밀번호는 최대 24자까지 허용합니다')
    .refine(
      (password) => /[a-z]/.test(password),
      '영어 소문자를 최소 1개 이상 포함해야 합니다'
    )
    .refine(
      (password) => /[A-Z]/.test(password),
      '영어 대문자를 최소 1개 이상 포함해야 합니다'
    )
    .refine(
      (password) => /[0-9]/.test(password),
      '숫자를 최소 1개 이상 포함해야 합니다'
    )
    .refine(
      (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      '특수문자를 최소 1개 이상 포함해야 합니다'
    ),

    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
})

export type SignUpSchemaKeys = keyof z.infer<typeof signUpSchema>
export type SignUpValidationError = Partial<Record<SignUpSchemaKeys, string>>

export interface SignInUser {
  id: number;
  username: string;
}

export interface SignUpUser extends SignInUser {
  password: string;
}

export type SignUpResult = {
    result: FormSubmitResultType,
    validationError?: SignUpValidationError,
    data?: SignUpUser,
}
