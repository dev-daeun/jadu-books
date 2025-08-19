import settings from "@/settings"
import { Redis } from "@upstash/redis"


const redis = new Redis({
    url: settings.redisUrl,
    token: settings.redisToken,
})


export default redis
