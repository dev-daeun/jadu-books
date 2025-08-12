import styles  from "./review-item.module.css"
import { ReviewItem as ReviewItemType } from "@/types/review"


export default function ReviewItem({ author, content, createdAt }: ReviewItemType) {
    return (
        <section className={styles.container}>
            <div className={styles.author}>{author}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.bottom_container}>
                <div>{new Date(createdAt!).toLocaleDateString('sv-SE')}</div>
                <div className={styles.delete_button}>삭제</div>
            </div>
        </section>
    )
}