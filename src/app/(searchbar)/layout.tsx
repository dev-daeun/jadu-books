import { ReactNode } from "react";
import SearchBar from "./components/search-bar";


export default function Layout({ children }: { children: Readonly<ReactNode> }) {
    return (
        <div>
            <SearchBar/>
            <div>{children}</div>
        </div>
    )
}