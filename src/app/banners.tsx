import Link from "next/link";
import styles from "./banners.module.css"
import Image from "next/image";


export default function Banner({ children }: { children?: React.ReactNode }) {
    return (
        <Link className={styles.link} href="/">
            <div className={styles.banner}>
                <Image src="/thumbnail.png" alt="자두북스" width={26} height={26} />
                <span>자두북스</span>
                {children}
            </div>
        </Link>
    )

}
