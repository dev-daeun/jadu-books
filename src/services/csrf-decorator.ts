"use server"

import { verifyCsrfToken } from "@/app/util/csrf-token"
import { FormSubmitResultType } from "@/types/form-submit"

export function requireCsrf<T extends (...args: any[]) => Promise<any>>(target: T): T {
  return ((...args: any[]) => {
    const formData = args[1] as FormData
    
    if (!verifyCsrfToken(formData.get("csrfToken")?.toString() || "")) {
      return { result: FormSubmitResultType.CSRF_ERROR }
    }
    
    return target(...args)
  }) as T
}