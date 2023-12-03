import { Redis } from "@upstash/redis";

const redisConfig: any = {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

const db = new Redis(redisConfig);

export default db;