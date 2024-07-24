import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheRepository {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async saveData<T>(data: T, key: string): Promise<void> {
    await this.redis.set(key, JSON.stringify(data), 'EX', 180);
  }

  async getData<T>(key: string): Promise<T> {
    const data = await this.redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
