import { fetchAllBooks, fetchRecommendedBooks } from "@/services/books";
import BookItemComponent from "./components/book-item";
import styles from "./page.module.css";
import { BookItem } from "@/types/book-item";
import ApiResponse from "@/types/api-response";


async function AllBooks(){
  const response: ApiResponse<BookItem[]> = await fetchAllBooks()
  if (!response.success) {
    return (
      <div><p>오류가 발생했습니다...</p></div>
    )
  }
  return (
    <div>
      {response.data.map((book) => <BookItemComponent key={book.id} {...book}/>)}
    </div>
  )
}


async function RecommendedBooks(){
  const response: ApiResponse<BookItem[]> = await fetchRecommendedBooks()
  if (!response.success) {
    return (
      <div><p>오류가 발생했습니다...</p></div>
    )
  }
  return (
    <div>
      {response.data.map((book) => <BookItemComponent key={book.id} {...book}/>)}
    </div>
  )
}


export default async function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecommendedBooks/>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks/>
      </section>
      
    </div>
  );
}
