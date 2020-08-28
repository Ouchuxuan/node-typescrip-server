import { Redis } from 'ioredis';
import RedisClient from 'ioredis'
import config from '../config';


class RedisHelper {
  protected redisInstance: Redis
  protected db: number
  constructor(db: number = 0) {
    this.db = db;
    this.init()
  }
  private init() {
    this.redisInstance = new RedisClient({
      port: config.redisConfig.port,
      host: config.redisConfig.host,
      db: this.db,
      password: config.redisConfig.password
    })
  }

  public async set(key: string, value: any, time = 0) {
    if(time) {
    //  await this.redisInstance.set(key, value, time)
    } else {

    }

  }

}