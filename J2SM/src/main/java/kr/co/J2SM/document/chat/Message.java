package kr.co.J2SM.document.chat;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "messages")
public class Message {
    // 메시지 도메인 객체 (MongoDB `messages` 컬렉션)

    @Id
    private String id;          // MongoDB ObjectId

    private String roomId;      // 이 메시지가 속한 채팅방 ID
    private String senderId;    // 보낸 사람 userId
    private String text;        // 메시지 본문
    private Instant timestamp;  // 보낸 시각

    private List<String> readBy;  // 읽음 처리된 사용자 ID 리스트
}