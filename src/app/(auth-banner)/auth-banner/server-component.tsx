import { getServerSession } from "next-auth"
import { SignInBanner, SignOutBanner } from "./client-component"

export default async function AuthBanner() {
    const session = await getServerSession()
    if (session?.user) {
        return <SignOutBanner />
    }
    else {
        return <SignInBanner />
    }
}
