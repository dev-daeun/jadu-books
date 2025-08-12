import { getReviews } from "@/services/reviews";
import ApiResponse from "@/types/api-response";
import ReviewItem from "./review-item";
import { ReviewItem as ReviewItemType } from "@/types/review";
import { StatusCodes } from "http-status-codes";


export default async function ReviewList({ bookId }: { bookId: number }) {
    const result: ApiResponse<ReviewItemType[]> = await getReviews(bookId)
    switch (result.statusCode) {
        case StatusCodes.OK:
            return (
                <section>
                    {result.data.map((reviewItem) => ( <ReviewItem key={`review-item-${reviewItem.id}`} {...reviewItem} /> ))}
                </section>
            )
        case StatusCodes.INTERNAL_SERVER_ERROR:
            return (
                <p>리뷰를 불러오는 과정에서 오류가 발생했습니다.</p>
            )
    }
}