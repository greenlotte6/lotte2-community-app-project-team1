package kr.co.J2SM.service.chat;

import kr.co.J2SM.document.chat.ChatRoom;
import kr.co.J2SM.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    // 채팅방 관련 로직

    private final ChatRoomRepository roomRepo;

    // 전체 방 조회 (추후 사용자 필터링 가능)
    public List<ChatRoom> getAllRooms() {
        return roomRepo.findAll();
    }

    // 새 방 생성
    public ChatRoom createRoom(String name, List<String> participants) {
        ChatRoom room = ChatRoom.builder()
                .name(name)
                .participants(participants)
                .build();
        return roomRepo.save(room);
    }

    // (옵션) 방 삭제
    public void deleteRoom(String roomId) {
        roomRepo.deleteById(roomId);
    }
}