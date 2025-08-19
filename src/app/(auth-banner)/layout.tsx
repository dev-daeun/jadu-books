import Banner from "../banners"
import AuthBanner from "./auth-banner/server-component"
import style from "./layout.module.css"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className={style.header}>
                <Banner>
                    <AuthBanner />
                </Banner>
            </header>
            <main className={style.main}>{children}</main>
        </>
    )

}