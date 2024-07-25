import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheRepository } from './redis-cache.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          tls: {
            rejectUnauthorized: false,
          },
          maxRetriesPerRequest: 10,
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            console.log(
              `Redis connection retry #${times}, retrying in ${delay}ms`,
            );
            return delay;
          },
          reconnectOnError: (err) => {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
              return true;
            }
            return false;
          },
          connectTimeout: 10000,
          enableReadyCheck: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheRepository],
  exports: [RedisCacheRepository],
})
export class CacheRedisModule {}
