import { BookItem } from "@/types/book-item"
import settings from "@/settings"


export async function fetchAllBooks(q?: string): Promise<BookItem[]> {
    const url = new URL(settings.backendBaseUrl, "/book")
    if (q) {
        url.searchParams.append("q", q)
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error()
        }
        return await response.json()
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function fetchRecommendedBooks (): Promise<BookItem[]> {
  const url = new URL(settings.backendBaseUrl, "/book/random").toString()
  try {
      const response = await fetch(url)
      if (!response.ok) {
          throw new Error();
      }
      return await response.json()
  }
  catch (err) {
      console.log(err);
      return []
  }
}
