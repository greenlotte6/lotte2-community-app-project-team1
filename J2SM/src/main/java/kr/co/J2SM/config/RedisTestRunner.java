package kr.co.J2SM.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

// Redis 접속 확인용 클래스
@Component
public class RedisTestRunner implements CommandLineRunner {
    private final StringRedisTemplate redis;

    public RedisTestRunner(StringRedisTemplate redis) {
        this.redis = redis;
    }

    @Override
    public void run(String... args) {
        String pong = redis.getConnectionFactory().getConnection().ping();
        System.out.println("Redis PING -> " + pong);
    }
}