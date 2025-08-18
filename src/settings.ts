const settings = {
    backendBaseUrl: process.env.BACKEND_BASE_URL,
    csrfSecret: process.env.CSRF_SECRET as string,
    sessionSecret: process.env.NEXTAUTH_SECRET as string,
} as const;


export default settings;