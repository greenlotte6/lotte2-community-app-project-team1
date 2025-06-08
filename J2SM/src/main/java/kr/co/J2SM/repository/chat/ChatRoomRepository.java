package kr.co.J2SM.repository.chat;

import kr.co.J2SM.document.chat.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    // Spring Data MongoRepository<ChatRoom>
}
