import BookItemComponent from "../components/book-item";
import books from "@/mock/books.json"

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    return <>
        {books.map((book) => <BookItemComponent key={book.id} {...book}/>)}
    </>
}