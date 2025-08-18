import { getServerSession } from "next-auth";
import { SignInUser } from "@/types/user";



export default async function getUserSessionFromServer(): Promise<SignInUser | null> {
    const session = await getServerSession();
    if (!session || !session.user) return null;
    if (!('id' in session.user) || !session.user.id) return null;
    return {
        id: session.user.id,
        username: session.user.name
    } as SignInUser;
}
