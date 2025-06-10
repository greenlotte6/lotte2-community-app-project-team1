package kr.co.J2SM.dto.chat;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 채팅방 정보 전송용 DTO
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ChatRoomDTO {
    private String id;
    private String name;
    private List<String> participants;
    private String description;
    private LastMessageDTO lastMessage;
    private long unreadCount;
    private LocalDateTime createdAt;
    private List<String> admins;      // 채팅방 관리자
}
