import { ReactNode } from "react";

export default function Layout({ children }: { children: Readonly<ReactNode> }) {
    return (
        <div>
            <div>검색창</div>
            <div>{children}</div>
        </div>
    )
}