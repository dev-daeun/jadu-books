import { fetchAllBooks } from "@/services/books";
import BookItemComponent from "../../books/components/book-item";
import { BookItem } from "@/types/book-item";
import ApiResponse from "@/types/api-response";
import { StatusCodes } from "http-status-codes";
import { Suspense } from "react";
import BookListSkeleton from "../../books/components/book-list-skeleton";
import BackendErrorMessage from "../../books/components/backend-error-message";


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
      return <BackendErrorMessage />
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