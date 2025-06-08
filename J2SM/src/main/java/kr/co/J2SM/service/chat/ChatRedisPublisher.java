package kr.co.J2SM.service.chat;

import kr.co.J2SM.document.chat.Message;               // Message 도메인
import com.fasterxml.jackson.databind.ObjectMapper;     // JSON 직렬화용
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.StringRedisTemplate; // RedisTemplate
import org.springframework.stereotype.Service;           // @Service

@Log4j2
@RequiredArgsConstructor
@Service
public class ChatRedisPublisher {
    // MongoDB에 저장된 메시지를 Redis 채널로 퍼블리시

    private final StringRedisTemplate redis;
    private final ObjectMapper om;

    public void publish(Message msg) {
        String topic = "chat:room:" + msg.getRoomId();
        try {
            String json = om.writeValueAsString(msg);
            redis.convertAndSend(topic, json);
        } catch (Exception e) {
            throw new RuntimeException("Redis publish 실패", e);
        }
    }
}