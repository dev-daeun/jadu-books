"use server"


import ApiResponse from "@/types/api-response"
import { PostReviewResult, PostReviewResultType, Review, reviewSchema, ReviewSchemaKeys, ReviewValidationError, ReviewItem } from "@/types/review"
import { StatusCodes } from "http-status-codes"
import settings from "@/settings"
import { revalidatePath } from "next/cache"


async function postReview(review: Review): Promise<ApiResponse<Review | null>> {
    try {
        const response = await fetch(`${settings.backendBaseUrl}/review`, {
            method: "POST",
            body: JSON.stringify(review),
        })
        if (!response.ok) {
            console.error(`Backend responded error: endpoint=${response.url} status=${response.status} body=${await response.text()}`)
            return {statusCode: response.status as StatusCodes, data: null }
        }
        return {statusCode: response.status as StatusCodes, data: await response.json()}
    } catch (error) {
        console.error("Error occurred while posting review: ", error)
        return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data: null }
    }
}   


export async function createReview(previousState: PostReviewResult, formData: FormData): Promise<PostReviewResult> {
    const result = reviewSchema.safeParse({
        author: formData.get("author")?.toString(),
        content: formData.get("content")?.toString(),
        bookId: Number(formData.get("bookId")),
    })
    if (!result.success) {
        const validationError: ReviewValidationError = {}
        for (const err of result.error.issues) {
            validationError[err.path[0] as ReviewSchemaKeys] = err.message
        }
        return { result: PostReviewResultType.VALIDATION_FAILED, validationError: validationError }
    }
    
    const response = await postReview(result.data)
    if (response.statusCode === StatusCodes.CREATED) {
        revalidatePath(`/books/${result.data.bookId}`)
        return { result: PostReviewResultType.SUCCEEDED, backendResponse: response }
    }
    return { result: PostReviewResultType.BACKEND_ERROR, backendResponse: response }
}


export async function getReviews(bookId: number): Promise<ApiResponse<ReviewItem[]>> {
    try {
        const response = await fetch(`${settings.backendBaseUrl}/review/book/${bookId}`)
        if (!response.ok) {
            console.error(`Backend responded error: endpoint=${response.url} status=${response.status} body=${await response.text()}`)
            return {statusCode: response.status as StatusCodes, data: []}
        }
        return {statusCode: response.status as StatusCodes, data: await response.json()}
    } catch (error) {
        console.error("Error occurred while getting reviews: ", error)
        return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data: [] }
    }
}