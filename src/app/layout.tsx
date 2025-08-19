import "./globals.css";
import style from "./layout.module.css"
import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import SessionComponent from "./session-provider";


export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession()
  return (
      <html>
        <body>
          <SessionComponent session={session}>
            <div className={style.container}>
              {children}
              {modal}
              <footer className={style.footer}><p>made by @dev-daeun</p></footer>
            </div>
            <div id="modal-root"></div>  {/* 모달 컴포넌트 렌더링 위치 */}
            </SessionComponent>
          </body>
      </html>
  )
}
