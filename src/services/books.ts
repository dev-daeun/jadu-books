import { BookItem } from "@/types/book-item"
import settings from "@/settings"


export async function fetchAllBooks(q?: string): Promise<BookItem[]> {
    const urlpath = q ? "/book/search" : "/book"
    const url = new URL(urlpath, settings.backendBaseUrl)
    if (q) {
        url.searchParams.append("q", q)
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(await response.text())
        }
        return await response.json()
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function fetchRecommendedBooks (): Promise<BookItem[]> {
  const url = new URL("/book/random", settings.backendBaseUrl).toString()
  try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(await response.text())
      }
      return await response.json()
  }
  catch (err) {
      console.log(err);
      return []
  }
}
