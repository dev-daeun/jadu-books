import ReviewDelete from "./review-delete"
import styles  from "./review-item.module.css"
import { ReviewItem as ReviewItemType } from "@/types/review"
import { getServerSession } from "next-auth"


export default async function ReviewItem({ id, bookId, author, content, createdAt }: ReviewItemType) {
    const session = await getServerSession()
    if (session?.user?.name === author) {
        return (
            <section className={styles.container}>
                <div className={styles.author}>{author}</div>
                <div className={styles.content}>{content}</div>
                <div className={styles.bottom_container}>
                    <div>{new Date(createdAt!).toLocaleDateString('sv-SE')}</div>
                    <ReviewDelete reviewId={id} bookId={bookId}/>
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
