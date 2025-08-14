import { fetchBook } from "@/services/books";
import ApiResponse from "@/types/api-response";
import { BookItem } from "@/types/book-item";
import { StatusCodes } from "http-status-codes";
import styles from "./page.module.css"
import { notFound } from "next/navigation";
import BackendErrorMessage from "@/app/books/components/backend-error-message";
import ReviewEditor from "./components/review-editor";
// import ReviewList from "./components/review-list";
import Image from "next/image";
import { fetchAllBooks } from "@/services/books";


export async function generateStaticParams() {
  const response: ApiResponse<BookItem[]> = await fetchAllBooks()
  return response.data.map((book) => ({ id: [book.id.toString()] }))
}


function BookDetail({ title, subTitle, description, author, publisher, coverImgUrl }: BookItem) {
    return (
        <section >
            <div className={styles.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <Image src={coverImgUrl} alt={title} width={240} height={300} />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.author}>{author} | {publisher}</div>
            <div className={styles.description}>{description}</div>
        </section>
      )
}


export async function generateMetadata({ params }: { params: { id: string[] } }) {
  const bookId = Number(params.id[0])

  // request memoization 으로 인해 도서 상세페이지 내에서는 벡엔드에 중복요청 발생하지 않음
  const response: ApiResponse<BookItem | null> = await fetchBook(bookId)
  return {
    title: `${response.data?.title} : 자두북스`,
    description: `${response.data?.title} 자두북스 도서 상세 페이지`,
    openGraph: {
      title: `${response.data?.title} : 자두북스`,
      description: `${response.data?.title} 자두북스 도서 상세 페이지`,
      images: [response.data?.coverImgUrl]
    }
  }
}


export default async function Page({ params }: { params: { id: string[] } }) {
    const bookId = Number(params.id[0])
    const response: ApiResponse<BookItem | null> = await fetchBook(bookId)
    switch (response.statusCode) {
        case StatusCodes.OK:
            return (
                <div className={styles.container}>
                    <BookDetail {...response.data as BookItem}/>
                    <ReviewEditor bookId={bookId} />
                    {/* <ReviewList bookId={bookId} /> */}
                </div>
            )
        case StatusCodes.NOT_FOUND:
            notFound()
        case StatusCodes.INTERNAL_SERVER_ERROR:
            return <BackendErrorMessage />
    } 
}


