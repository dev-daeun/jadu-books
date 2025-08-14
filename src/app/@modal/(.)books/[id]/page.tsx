// 도서 상세페이지 인터셉팅
import Modal from "@/app/books/[...id]/components/modal"
import Page from "@/app/books/[...id]/page"


export default function InterceptingPage(props: any) {
    const adaptedProps = {
        ...props,
        params: { id: [props?.params?.id].filter(Boolean) }
    }
    return (
        <Modal>
            <Page {...adaptedProps} />
        </Modal>
        
    )
}
