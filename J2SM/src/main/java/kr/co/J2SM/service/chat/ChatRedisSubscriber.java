package kr.co.J2SM.service.chat;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.Message;               // Redis 메시지 타입
import org.springframework.messaging.simp.SimpMessagingTemplate;      // STOMP/WebSocket 푸시용
import com.fasterxml.jackson.databind.ObjectMapper;                  // JSON 변환용

@Log4j2
@RequiredArgsConstructor
@Service
public class ChatRedisSubscriber implements MessageListener {
    // Redis에서 메시지 구독 → STOMP로 브로드캐스트

    private final SimpMessagingTemplate ws;
    private final ObjectMapper om;

    @Override
    public void onMessage(Message m, byte[] pattern) {
        try {
            // Redis Message의 body를 도메인 Message로 역직렬화
            kr.co.J2SM.document.chat.Message msg =
                    om.readValue(m.getBody(), kr.co.J2SM.document.chat.Message.class);
            ws.convertAndSend("/topic/room/" + msg.getRoomId(), msg);
        } catch (Exception e) {
            throw new RuntimeException("Redis subscribe 처리 실패", e);
        }
    }
}