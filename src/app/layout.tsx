import "./globals.css";
import style from "./layout.module.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <h3>자두북스</h3>
          </header>
          <main className={style.main}>{children}</main>
          <footer className={style.footer}><p>made by @dev-daeun</p></footer>
        </div>
      </body>
    </html>
  )
}
