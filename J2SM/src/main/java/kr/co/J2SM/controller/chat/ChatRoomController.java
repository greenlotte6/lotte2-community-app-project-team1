package kr.co.J2SM.controller.chat;

import kr.co.J2SM.document.chat.ChatRoom;
import kr.co.J2SM.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService roomService;

    // 1) 전체 방 목록 조회
    @GetMapping
    public List<ChatRoom> listRooms() {
        return roomService.getAllRooms();
    }

    // 2) 새 방 생성
    @PostMapping
    public ResponseEntity<ChatRoom> createRoom(@RequestBody CreateRoomRequest req) {
        ChatRoom created = roomService.createRoom(
                req.name(),
                req.participants()
        );
        return ResponseEntity.ok(created);
    }

    // 3) (옵션) 방 삭제
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }

    // 요청 DTO
    public static record CreateRoomRequest(String name, List<String> participants) {}
}