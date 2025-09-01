import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import dotenv from 'dotenv';

dotenv.config();
const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN),
  limiter: Ratelimit.slidingWindow(20, '30 s'),
});

export { ratelimit };
