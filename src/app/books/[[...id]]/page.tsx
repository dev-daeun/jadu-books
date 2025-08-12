import { fetchBook } from "@/services/books";
import ApiResponse from "@/types/api-response";
import { BookItem } from "@/types/book-item";
import { StatusCodes } from "http-status-codes";
import styles from "./page.module.css"
import { notFound } from "next/navigation";
import BackendErrorMessage from "@/app/(searchbar)/components/backend-error-message";
import ReviewEditor from "./components/review-editor";


function BookDetail({ title, subTitle, description, author, publisher, coverImgUrl }: BookItem) {
    return (
        <section >
            <div className={styles.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl}/>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.author}>{author} | {publisher}</div>
            <div className={styles.description}>{description}</div>
        </section>
      )
}





export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response: ApiResponse<BookItem | null> = await fetchBook(Number(id))
    switch (response.statusCode) {
        case StatusCodes.OK:
            return (
                <div className={styles.container}>
                    <BookDetail {...response.data as BookItem}/>
                    <ReviewEditor bookId={Number(id)} />
                </div>
            )
        case StatusCodes.NOT_FOUND:
            notFound()
        case StatusCodes.INTERNAL_SERVER_ERROR:
            return <BackendErrorMessage />
    } 
}


