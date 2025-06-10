package kr.co.J2SM.controller.chat;

import kr.co.J2SM.document.chat.ChatRoom;
import kr.co.J2SM.dto.chat.ChatRoomDTO;
import kr.co.J2SM.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService roomService;

    // 1) 전체 방 목록 조회
    @GetMapping("/{userId}")
    public List<ChatRoomDTO> listRooms(@PathVariable String userId) {

        return roomService.getRoomsForUser(userId);
        // return null;
    }

    // 2) 새 방 생성
    @PostMapping
    public ResponseEntity<ChatRoom> createRoom(@RequestBody CreateRoomRequest req) {

        System.out.println(req);
        ChatRoom created = roomService.createRoom(
                req.name(),
                req.participants(),
                req.description()
        );
        return ResponseEntity.ok(created);
    }

    // 3) (옵션) 방 삭제
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.noContent().build();
    }
    
    // 4) 개인 룸 조회
    @GetMapping("/select/{roomId}")
    public ResponseEntity<ChatRoom> getRoom(@PathVariable String roomId) {
        log.info("roomId 조회 : " + roomId);
        ChatRoom room = roomService.getRoom(roomId);
        return ResponseEntity.ok(room);
    }
    

    // 요청 DTO
    public static record CreateRoomRequest(String name, List<String> participants, String description) {}
}