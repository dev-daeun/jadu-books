import { fetchAllBooks, fetchRecommendedBooks } from "@/services/books";
import BookItemComponent from "./components/book-item";
import styles from "./page.module.css";
import { BookItem } from "@/types/book-item";
import ApiResponse from "@/types/api-response";
import { StatusCodes } from "http-status-codes";
import { Suspense } from "react";
import BookListSkeleton from "./components/book-list-skeleton";


async function AllBooks(){
  const response: ApiResponse<BookItem[]> = await fetchAllBooks()
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


async function RecommendedBooks(){
  const response: ApiResponse<BookItem[]> = await fetchRecommendedBooks()
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


export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton />}>
            <RecommendedBooks/>
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton num={5} />}>
            <AllBooks/>
        </Suspense>
      </section>
      
    </div>
  );
}

