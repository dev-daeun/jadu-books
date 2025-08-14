import "./globals.css";
import style from "./layout.module.css"
import Image from "next/image";
import Link from "next/link";


export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link className={style.link} href="/">
              <div className={style.banner}>
                <Image src="/thumbnail.png" alt="자두북스" width={26} height={26} />
                <span>자두북스</span>
              </div>
            </Link>
          </header>
          <main className={style.main}>{children}</main>
          {modal}
          <footer className={style.footer}><p>made by @dev-daeun</p></footer>
        </div>
        <div id="modal-root"></div>  {/* 모달 컴포넌트 렌더링 위치 */}
      </body>
    </html>
  )
}
