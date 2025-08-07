import settings from "@/settings"
import ApiResponse from "@/types/api-response"
import { BookItem } from "@/types/book-item"



export async function fetchAllBooks(q?: string): Promise<ApiResponse<BookItem[]>> {
    const urlpath = q ? "/book/search" : "/book"
    const url = new URL(urlpath, settings.backendBaseUrl)
    if (q) {
        url.searchParams.append("q", q)
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.error("Backend responded error: ", await response.text())
            return { success: false, data: [] }
        }
        return { success: true, data: await response.json() }
    }
    catch (err) {
        console.error("Error occurred while fetching books: ", err)
        return { success: false, data: [] }
    }

}

export async function fetchRecommendedBooks (): Promise<ApiResponse<BookItem[]>> {
  const url = new URL("/book/random", settings.backendBaseUrl).toString()
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.error("Backend responded error: ", await response.text())
            return { success: false, data: [] }
        }
        return { success: true, data: await response.json() }
    }
    catch (err) {
        console.error("Error occurred while fetching recommended books: ", err)
        return { success: false, data: [] }
    }
}
