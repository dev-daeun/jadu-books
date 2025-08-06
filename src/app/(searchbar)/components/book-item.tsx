import Link from "next/link";

import { BookItem } from "@/types/book-item";
import styles from "./book-item.module.css"

export default function BookItemComponent ({ id, title, subTitle, description, author, publisher, coverImgUrl }: BookItem) {
    return (
        <Link href={`/books/${id}`} className={styles.container}>
            <img src={coverImgUrl}/>
            <div>
                <div className={styles.title}>{title}</div>
                <div className={styles.subTitle}>{subTitle}</div>
                <br/>
                <div className={styles.author}>{author} | {publisher}</div>
            </div>
        </Link>
    )
}