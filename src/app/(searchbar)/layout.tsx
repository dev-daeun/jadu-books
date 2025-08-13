import { ReactNode } from "react";


export default function Layout({ children, searchbar }: { children: Readonly<ReactNode>, searchbar: Readonly<ReactNode> }) {
    return (
        <div>
            {searchbar}
            <div>{children}</div>
        </div>
    )
}