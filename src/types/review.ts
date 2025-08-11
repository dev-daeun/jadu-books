import { z } from "zod"
import ApiResponse from "./api-response"


export const reviewSchema = z.object({
  author: z.string()
    .min(2, '작성자명은 최소 2글자 이상이어야 합니다.')
    .max(8, '작성자명은 최대 8글자까지 가능합니다.'),
  
  content: z.string()
    .min(10, '리뷰는 최소 10글자 이상이어야 합니다.')
    .max(200, '리뷰는 최대 200글자까지 가능합니다.'),
  
  bookId: z.number()
    .int('bookId는 정수여야 합니다.')
    .positive('bookId는 양수여야 합니다.')
})

export type Review = z.infer<typeof reviewSchema>
export type ReviewSchemaKeys = keyof z.infer<typeof reviewSchema>
export type ReviewValidationError = Partial<Record<ReviewSchemaKeys, string>>


export enum PostReviewResultType {
  INITIAL,
  VALIDATION_FAILED,
  BACKEND_ERROR,
  SUCCEEDED
}
export type PostReviewResult = {
  result: PostReviewResultType,
  validationError?: ReviewValidationError,
  backendResponse?: ApiResponse<Review | null>
}
