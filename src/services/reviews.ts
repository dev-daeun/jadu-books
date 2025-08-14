"use server"


import ApiResponse from "@/types/api-response"
import { PostReviewResult, PostReviewResultType, Review, reviewSchema, ReviewSchemaKeys, ReviewValidationError, ReviewItem } from "@/types/review"
import { StatusCodes } from "http-status-codes"
import settings from "@/settings"
import { revalidateTag } from "next/cache"


async function requestPostReview(review: Review): Promise<ApiResponse<Review | null>> {
    try {
        const response = await fetch(new URL("/review", settings.backendBaseUrl).toString(), {
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


export async function createReviewAction(previousState: PostReviewResult, formData: FormData): Promise<PostReviewResult> {
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
    
    const response = await requestPostReview(result.data)
    if (response.statusCode === StatusCodes.CREATED) {
        revalidateTag(`review-list-${result.data.bookId}`)
        return { result: PostReviewResultType.SUCCEEDED, backendResponse: response }
    }
    return { result: PostReviewResultType.BACKEND_ERROR, backendResponse: response }
}


export async function getReviews(bookId: number): Promise<ApiResponse<ReviewItem[]>> {
    try {
        const response = await fetch(
            new URL(`/review/book/${bookId}`, settings.backendBaseUrl).toString(),
            { next: { tags: [`review-list-${bookId}`] }, cache: "no-store" }
        )
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


async function requestDeleteReview(reviewId: number): Promise<ApiResponse<null>> {
    try {
        const response = await fetch(new URL(`/review/${reviewId}`, settings.backendBaseUrl).toString(), {
            method: "DELETE",
        })
        if (!response.ok) {
            console.error(`Backend responded error: endpoint=${response.url} status=${response.status} body=${await response.text()}`)
        }
        return {statusCode: response.status as StatusCodes, data: null}
    } catch (error) {
        console.error("Error occurred while deleting review: ", error)
        return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data: null }
    }
}


export async function deleteReviewAction(previousState: PostReviewResult, formData: FormData): Promise<PostReviewResult> {
    const reviewId = Number(formData.get("reviewId"))
    const bookId = Number(formData.get("bookId"))
    const response = await requestDeleteReview(reviewId)
    if (response.statusCode === StatusCodes.OK) {
        revalidateTag(`review-list-${bookId}`)
        return { result: PostReviewResultType.SUCCEEDED, backendResponse: response }
    }
    return { result: PostReviewResultType.BACKEND_ERROR, backendResponse: response }
}
