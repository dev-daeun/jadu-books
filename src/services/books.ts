import settings from "@/settings"
import ApiResponse from "@/types/api-response"
import { BookItem } from "@/types/book-item"
import { StatusCodes } from "http-status-codes"



export async function fetchAllBooks(q?: string): Promise<ApiResponse<BookItem[]>> {
    const urlpath = q ? "/book/search" : "/book"
    const url = new URL(urlpath, settings.backendBaseUrl)
    if (q) {
        url.searchParams.append("q", q)
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.error(`Backend responded error: endpoint=${response.url} status=${response.status} body=${await response.text()}`)
            return { statusCode: response.status as StatusCodes, data: [] }
        }
        return { statusCode: response.status as StatusCodes, data: await response.json() }
    }
    catch (err) {
        console.error("Error occurred while fetching book list: ", err)
        return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR,  data: [] }
    }

}

export async function fetchRecommendedBooks (): Promise<ApiResponse<BookItem[]>> {
  const url = new URL("/book/random", settings.backendBaseUrl).toString()
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.error(`Backend responded error: endpoint=${response.url} status=${response.status} body=${await response.text()}`)
            return { statusCode: response.status as StatusCodes, data: [] }
        }
        return { statusCode: response.status as StatusCodes, data: await response.json() }
    }
    catch (err) {
        console.error("Error occurred while fetching recommended book list: ", err)
        return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR,  data: [] }
    }
}


export async function fetchBook(id: number): Promise<ApiResponse<BookItem | null>> {
    const url = new URL(`/book/${id}`, settings.backendBaseUrl).toString()
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.error(`Backend responded error: endpoint=${response.url} status=${response.status} body=${await response.text()}`)
            return { statusCode: response.status as StatusCodes, data: null }
        }
        return { statusCode: response.status as StatusCodes, data: await response.json() }
    }
    catch (err) {
        console.error("Error occurred while fetching book: ", err)
        return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data: null }
    }
}