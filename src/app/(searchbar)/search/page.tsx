import { fetchAllBooks } from "@/services/books";
import BookItemComponent from "../components/book-item";
import { BookItem } from "@/types/book-item";
import ApiResponse from "@/types/api-response";
import { StatusCodes } from "http-status-codes";
import { Suspense } from "react";
import BookListSkeleton from "../components/book-list-skeleton";


async function SearchResult({ q }: { q?: string }) {
  const response: ApiResponse<BookItem[]> = await fetchAllBooks(q)
  switch(response.statusCode) {
    case StatusCodes.OK:
      return (
          <div>
            {response.data.map((book) => <BookItemComponent key={book.id} {...book}/>)}
          </div>
      )
    case StatusCodes.INTERNAL_SERVER_ERROR:
      return (
        <div><p>오류가 발생했습니다...</p></div>
      )
  }
}


export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    return (
      <Suspense fallback={<BookListSkeleton />} key={q}>
       <SearchResult q={q}/>
      </Suspense>
    )
}