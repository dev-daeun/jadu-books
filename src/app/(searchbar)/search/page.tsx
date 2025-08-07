import { fetchAllBooks } from "@/services/books";
import BookItemComponent from "../components/book-item";
import { BookItem } from "@/types/book-item";
import ApiResponse from "@/types/api-response";


export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    const response: ApiResponse<BookItem[]> = await fetchAllBooks(q)
    if (!response.success) {
        return (
            <div><p>오류가 발생했습니다...</p></div>
        )
    }
    return <>
        {response.data.map((book) => <BookItemComponent key={book.id} {...book}/>)}
    </>
}