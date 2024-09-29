import redis from 'redis';

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

await redisClient.connect();

export default redisClient;