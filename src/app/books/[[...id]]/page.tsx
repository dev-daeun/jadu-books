import { fetchBook } from "@/services/books";
import ApiResponse from "@/types/api-response";
import { BookItem } from "@/types/book-item";
import { StatusCodes } from "http-status-codes";
import styles from "./page.module.css"
import { notFound } from "next/navigation";


async function BookDetail({ title, subTitle, description, author, publisher, coverImgUrl }: BookItem) {
    return (
        <div className={styles.container}>
            <div className={styles.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl}/>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
            <div className={styles.author}>{author} | {publisher}</div>
            <div className={styles.description}>{description}</div>
        </div>
      )
}


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response: ApiResponse<BookItem | null> = await fetchBook(Number(id))
    switch (response.statusCode) {
        case StatusCodes.OK:
            return <BookDetail {...response.data as BookItem}/>
        case StatusCodes.NOT_FOUND:
            notFound()
        case StatusCodes.INTERNAL_SERVER_ERROR:
            return (
                <div><p>오류가 발생했습니다...</p></div>
            )
    } 
}