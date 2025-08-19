import Banner from "../banners";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Banner />
            {children}
        </>
    )
}