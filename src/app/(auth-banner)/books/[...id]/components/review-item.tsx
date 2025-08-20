import ReviewDelete from "./review-delete"
import styles  from "./review-item.module.css"
import { ReviewItem as ReviewItemType } from "@/types/review"
import { getServerSession } from "next-auth"
import { getCsrfToken } from "@/app/util/csrf-token"


export default async function ReviewItem({ id, bookId, author, content, createdAt }: ReviewItemType) {
    const session = await getServerSession()
    const csrfToken = getCsrfToken()
    if (session?.user?.name === author) {
        return (
            <section className={styles.container}>
                <div className={styles.author}>{author}</div>
                <div className={styles.content}>{content}</div>
                <div className={styles.bottom_container}>
                    <div>{new Date(createdAt!).toLocaleDateString('sv-SE')}</div>
                    <ReviewDelete reviewId={id} bookId={bookId} csrfToken={csrfToken}/>
                </div>
            </section>
        )
    } else {
        return <section className={styles.container}>
                <div className={styles.author}>{author}</div>
                <div className={styles.content}>{content}</div>
                <div className={styles.bottom_container}>
                    <div>{new Date(createdAt!).toLocaleDateString('sv-SE')}</div>
                </div>
        </section>
    }
    
}
