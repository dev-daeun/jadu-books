// 도서 상세페이지 인터셉팅
 import Modal from "@/app/books/[...id]/components/modal"
import BookDetail from "@/app/books/[...id]/page"


export default function Page(props: any) {
    return (
        <Modal>
            <BookDetail {...props} />
        </Modal>
    )
}
