package kr.co.J2SM.repository.chat;

import kr.co.J2SM.document.chat.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    // Spring Data MongoRepository<Message> (+커스텀 조회 메서드)

    List<Message> findByRoomIdOrderByTimestampAsc(String roomId);

    long countByRoomIdAndReadByNotContaining(String roomId, String userId);
}
