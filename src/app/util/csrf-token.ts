import Tokens from "csrf";
import settings from "@/settings";


export function getCsrfToken(): string {
    return new Tokens().create(settings.csrfSecret)
}

export function verifyCsrfToken(token: string): boolean {
    return new Tokens().verify(settings.csrfSecret, token)
}
