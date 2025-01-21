import { RateLimiterMemory } from 'rate-limiter-flexible';

const ipLimiter = new RateLimiterMemory({
  points: process.env.RATE_LIMIT_POINTS
    ? parseInt(process.env.RATE_LIMIT_POINTS)
    : 5,
  duration: process.env.RATE_LIMIT_DURATION
    ? parseInt(process.env.RATE_LIMIT_DURATION)
    : 3600,
});

const fingerprintLimiter = new RateLimiterMemory({
  points: process.env.RATE_LIMIT_POINTS
    ? parseInt(process.env.RATE_LIMIT_POINTS)
    : 5,
  duration: process.env.RATE_LIMIT_DURATION
    ? parseInt(process.env.RATE_LIMIT_DURATION)
    : 3600,
});

export { fingerprintLimiter, ipLimiter };
