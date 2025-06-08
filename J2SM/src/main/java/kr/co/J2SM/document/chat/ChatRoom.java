package kr.co.J2SM.document.chat;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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


}