package kr.co.J2SM.service.chat;


import kr.co.J2SM.document.chat.ChatRoom;
import kr.co.J2SM.document.chat.Message;
import kr.co.J2SM.dto.chat.ChatRoomDTO;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.chat.ChatRoomRepository;
import kr.co.J2SM.repository.chat.MessageRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ChatService {
    // 비즈니스 로직 (방 생성·메시지 저장·읽음 처리·조회)

    private final ChatRoomRepository    roomRepo;
    private final MessageRepository     msgRepo;
    private final ChatRedisPublisher    redisPublisher;
    private final UserRepository userRepo;

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

        // 방 정보 가져오기
        ChatRoom room = roomRepo.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("방 없음: " + roomId));

        // 유저 정보 가져오기
        User sender = userRepo.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음: " + senderId));



        Message msg = Message.builder()
                .roomId(roomId)
                .senderId(senderId)
                .text(text)
                .timestamp(Instant.now())
                .roomName(room.getName())
                .senderName(sender.getName())
                .readBy(Collections.singletonList(senderId))  // 발신자는 자동 읽음
                .build();

        // 메시지 저장
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

    // 안읽은 메시지 초기화
    public void markAsReadUser(String roomId, String userId) {
        // 해당 방에서 아직 userId가 readBy에 포함되지 않은 메시지만 골라서
        List<Message> unread = msgRepo.findByRoomIdAndReadByNotContaining(roomId, userId);
        unread.forEach(m -> m.getReadBy().add(userId));
        msgRepo.saveAll(unread);
    }


    public ChatRoom updateRoomName(String roomId, String newName) {
        ChatRoom room = roomRepo.findById(roomId)
                .orElseThrow(() -> new NoSuchElementException("채팅방이 없습니다: " + roomId));
        room.setName(newName);
        room = roomRepo.save(room);
        return room;
    }
}