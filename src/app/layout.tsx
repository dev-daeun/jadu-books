import "./globals.css";
import style from "./layout.module.css"
import Image from "next/image";
import Link from "next/link";
import SessionComponent from "./session";
import { Session } from "inspector";
import AuthBtn from "./api/auth/[...nextauth]/buttons";


export default function RootLayout({
  children,
  modal,
  session,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
}>) {
  return (
      <html>
        <body>
          <SessionComponent session={session}>
            <div className={style.container}>
              <header className={style.header}>
                <Link className={style.link} href="/">
                  <div className={style.banner}>
                    <Image src="/thumbnail.png" alt="자두북스" width={26} height={26} />
                    <span>자두북스</span>
                    <AuthBtn />
                  </div>
                </Link>
              </header>
              <main className={style.main}>{children}</main>
              {modal}
              <footer className={style.footer}><p>made by @dev-daeun</p></footer>
            </div>
            <div id="modal-root"></div>  {/* 모달 컴포넌트 렌더링 위치 */}
            </SessionComponent>
          </body>
      </html>
  )
}
