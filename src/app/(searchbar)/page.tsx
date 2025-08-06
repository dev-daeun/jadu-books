import styles from "./page.module.css";
import books from "@/mock/books.json"

export default function Home() {
  
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* {books.map((book) => <BookLayout key={book.id} {...book}/>)} */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* {books.map((book) => <BookLayout key={book.id} {...book}/>)} */}
      </section>
      
    </div>
  );
}
