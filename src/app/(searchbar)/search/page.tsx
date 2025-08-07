import { fetchAllBooks } from "@/services/books";
import BookItemComponent from "../components/book-item";


export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    const books = await fetchAllBooks(q)
    return <>
        {books.map((book) => <BookItemComponent key={book.id} {...book}/>)}
    </>
}