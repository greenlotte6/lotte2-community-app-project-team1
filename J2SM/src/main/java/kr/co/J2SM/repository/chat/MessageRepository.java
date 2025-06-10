package kr.co.J2SM.repository.chat;

import kr.co.J2SM.document.chat.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends MongoRepository<Message, String> {
    // Spring Data MongoRepository<Message> (+커스텀 조회 메서드)

    List<Message> findByRoomIdOrderByTimestampAsc(String roomId);

    long countByRoomIdAndReadByNotContaining(String roomId, String userId);

    Optional<Message> findTopByRoomIdOrderByTimestampDesc(String roomId);

    // 읽지 않은 메시지 조회
    List<Message> findByRoomIdAndReadByNotContaining(String roomId, String userId);
}
