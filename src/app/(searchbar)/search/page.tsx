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


export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  // 검색 페이지의 메타데이터를 동적으로 생성하는 함수
  const { q } = await searchParams;
  return {
    title: `"${q}" : 자두북스 검색 결과`,
    description: `"${q}" 자두북스 검색 결과`,
    openGraph: {
      title: `"${q}" : 자두북스 검색 결과`,
      description: `"${q}" 자두북스 검색 결과`,
      images: ["/thumbnail.png"]
    }
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