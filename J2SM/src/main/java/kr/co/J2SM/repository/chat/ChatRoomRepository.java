package kr.co.J2SM.repository.chat;

import kr.co.J2SM.document.chat.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    // Spring Data MongoRepository<ChatRoom>
    List<ChatRoom> findByParticipantsContains(String userId);
}
