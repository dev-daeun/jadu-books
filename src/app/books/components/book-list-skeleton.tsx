import BookItemSkeleton from "./book-item-skeleton"


export default function BookListSkeleton({ num = 3 }: {num?: number}) {
    return (
        <>
            {Array.from({ length: num }).map((_, idx) => (
                <BookItemSkeleton key={idx} />
            ))}
        </>
    )
}