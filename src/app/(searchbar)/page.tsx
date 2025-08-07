import { fetchAllBooks, fetchRecommendedBooks } from "@/services/books";
import BookItemComponent from "./components/book-item";
import styles from "./page.module.css";


async function AllBooks(){
  const books = await fetchAllBooks()
  return (
    <div>
      {books.map((book) => <BookItemComponent key={book.id} {...book}/>)}
    </div>
  )
}


async function RecommendedBooks(){
  const books = await fetchRecommendedBooks()
  return (
    <div>
      {books.map((book) => <BookItemComponent key={book.id} {...book}/>)}
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
