import { Metadata } from "next";
import Books from "../books/page";


export const metadata: Metadata = {
  title: "자두북스",
  description: "자두가 소개하는 도서를 만나보세요",
  openGraph: {
    title: "자두북스",
    description: "자두가 소개하는 도서를 만나보세요",
    images: ["/thumbnail.png"]
  }
}


export default function Home() {
  return <Books />
}
