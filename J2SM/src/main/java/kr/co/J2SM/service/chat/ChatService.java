package kr.co.J2SM.service.chat;


import kr.co.J2SM.document.chat.ChatRoom;
import kr.co.J2SM.document.chat.Message;
import kr.co.J2SM.repository.chat.ChatRoomRepository;
import kr.co.J2SM.repository.chat.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    // 비즈니스 로직 (방 생성·메시지 저장·읽음 처리·조회)

    private final ChatRoomRepository    roomRepo;
    private final MessageRepository     msgRepo;
    private final ChatRedisPublisher    redisPublisher;

    /** 1) 채팅방 생성 */
    public ChatRoom createRoom(String name, List<String> participants) {
        ChatRoom room = ChatRoom.builder()
                .name(name)
                .participants(participants)
                .build();
        return roomRepo.save(room);
    }

    /** 2) 메시지 전송 → Mongo 저장 + Redis 퍼블리시 */
    public Message sendMessage(String roomId, String senderId, String text) {
        Message msg = Message.builder()
                .roomId(roomId)
                .senderId(senderId)
                .text(text)
                .timestamp(Instant.now())
                .readBy(Collections.singletonList(senderId))  // 발신자는 자동 읽음
                .build();
        Message saved = msgRepo.save(msg);
        redisPublisher.publish(saved);
        return saved;
    }

    /** 3) 메시지 읽음 처리 */
    public void markAsRead(String messageId, String userId) {
        msgRepo.findById(messageId).ifPresent(msg -> {
            if (!msg.getReadBy().contains(userId)) {
                msg.getReadBy().add(userId);
                msgRepo.save(msg);
            }
        });
    }

    /** 4) 방별 메시지 조회 */
    public List<Message> getMessages(String roomId) {
        return msgRepo.findByRoomIdOrderByTimestampAsc(roomId);
    }

    /** 5) 안읽은 메시지 수 조회 */
    public long getUnreadCount(String roomId, String userId) {
        return msgRepo.countByRoomIdAndReadByNotContaining(roomId, userId);
    }
}