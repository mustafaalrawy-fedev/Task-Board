import { ratelimit } from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(`my-rate-limiter-${req.ip}`);
    if (!success) {
      return res.status(429).json({
        message: 'Too many requests,  Please Try Again Later.',
      });
    }
    next();
  } catch (error) {
    console.log(`Rate Limiter Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error!' });
    next(error);
  }
};

export default rateLimiter;
