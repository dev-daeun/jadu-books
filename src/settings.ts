const settings = {
    backendBaseUrl: process.env.BACKEND_BASE_URL,
    csrfSecret: process.env.CSRF_SECRET as string,

    sessionSecret: process.env.NEXTAUTH_SECRET as string,

    redisUrl: process.env.UPSTASH_REDIS_REST_URL as string,
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN as string,
} as const;


export default settings;