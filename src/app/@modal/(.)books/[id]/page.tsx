// 도서 상세페이지 인터셉팅
import Modal from "@/app/books/[...id]/components/modal"
import BookDetail from "@/app/books/[...id]/page"


export default function Page(props: any) {
    const adaptedProps = {
        ...props,
        params: { id: [props?.params?.id].filter(Boolean) }
    }
    return (
        <Modal>
            <BookDetail {...adaptedProps} />
        </Modal>
    )
}
