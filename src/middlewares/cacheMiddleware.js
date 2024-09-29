import redisClient from '../config/redis/redis.js';

export const cacheMiddleware = async (req, res, next) => {
  const key = req.params.id;

  if (!key) {
    console.error('Missing key in request params');
    return res.status(400).json({ error: 'Bad Request' });
  }

  const data = await redisClient.get(key);

  if (data) {
    return res.status(200).json(JSON.parse(data));
  } else {
    next();
  }
 };

 export const cacheGetAllMiddleware = async (req, res, next) => {
  const data = await redisClient.get('getAllUsers');

  if (data) {
    return res.status(200).json(JSON.parse(data));
  } else {
    next();
  }
}