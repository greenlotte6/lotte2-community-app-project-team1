package kr.co.J2SM.service.chat;

import kr.co.J2SM.document.chat.ChatRoom;
import kr.co.J2SM.document.chat.Message;
import kr.co.J2SM.dto.chat.ChatRoomDTO;
import kr.co.J2SM.dto.chat.LastMessageDTO;
import kr.co.J2SM.repository.chat.ChatRoomRepository;
import kr.co.J2SM.repository.chat.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRoomService {
    // 채팅방 관련 로직

    private final ChatRoomRepository roomRepo;
    private final MessageRepository msgRepo;

    public List<ChatRoomDTO> getRoomsForUser(String userId) {
        return roomRepo.findByParticipantsContains(userId)
                .stream()
                .map(room -> toDTO(room, userId))
                .collect(Collectors.toList());
    }

    /**
     * ChatRoom 도큐먼트 → ChatRoomDTO 매핑
     */
    private ChatRoomDTO toDTO(ChatRoom room, String userId) {
        // 1) 최근 메시지 조회 (timestamp 기준 내림차순)
        Optional<Message> optLast =
                msgRepo.findTopByRoomIdOrderByTimestampDesc(room.getId());
        LastMessageDTO lastMsg = optLast
                .map(msg -> LastMessageDTO.builder()
                        .senderId(msg.getSenderId())
                        .senderName(msg.getSenderName())
                        .text(msg.getText())
                        .sentAt(msg.getTimestamp()
                                .atZone(ZoneId.systemDefault())
                                .toLocalDateTime())
                        .build())
                .orElse(null);

        // 2) 읽지 않은 메시지 개수 (readBy 리스트에 userId 미포함 카운트)
        long unread = msgRepo
                .countByRoomIdAndReadByNotContaining(room.getId(), userId);

        // 3) DTO 빌드
        return ChatRoomDTO.builder()
                .id(room.getId())
                .name(room.getName())
                .participants(room.getParticipants())
                .description(room.getDescription())
                .lastMessage(lastMsg)
                .unreadCount(unread)
                .build();
    }

    // 새 방 생성
    public ChatRoom createRoom(String name, List<String> participants, String description) {

        if(description.equals("group")){
            description = "단체 채널";
        }else{
            description = "개인 채널";
        }

        ChatRoom room = ChatRoom.builder()
                .name(name)
                .participants(participants)
                .description(description)
                .admins(List.of(participants.get(0)))
                .build();

        log.info("새로운 채팅방 : {}", room);
        return roomRepo.save(room);
    }

    // (옵션) 방 삭제
    public void deleteRoom(String roomId) {
        roomRepo.deleteById(roomId);
    }

    public ChatRoom getRoom(String roomId) {
        Optional<ChatRoom> room = roomRepo.findById(roomId);
        return room.orElse(null);
    }
}