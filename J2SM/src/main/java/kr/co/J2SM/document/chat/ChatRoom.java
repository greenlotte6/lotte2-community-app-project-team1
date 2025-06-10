package kr.co.J2SM.document.chat;

import kr.co.J2SM.dto.chat.LastMessageDTO;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import org.springframework.data.annotation.Transient;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "chat_rooms")
public class ChatRoom {

    // 채팅방 도메인 객체 (MongoDB `chat_rooms` 컬렉션)

    @Id
    private String id;                  // MongoDB ObjectId
    private String name;                // 방 이름
    private List<String> participants;  // 참여자 userId 리스트
    private String description; // 방 설명 (개인채팅, 단체채팅, 사용자 설정)

    @CreatedDate
    private Instant createdAt;

}