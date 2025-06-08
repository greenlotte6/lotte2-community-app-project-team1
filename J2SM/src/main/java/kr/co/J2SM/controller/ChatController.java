package kr.co.J2SM.controller;


import kr.co.J2SM.document.chat.Message;

import kr.co.J2SM.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.List;
@Controller
@RequiredArgsConstructor
public class ChatController {
    // STOMP 메시지 매핑(@MessageMapping) 핸들러

    private final ChatService chatService;

    // 클라이언트가 /app/chat.sendMessage 로 보내는 메시지 처리
    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @Payload Message incoming
    ) {
        return chatService.sendMessage(roomId, incoming.getSenderId(), incoming.getText());
    }

    // 클라이언트가 /app/chat.read/{roomId}/{messageId}?userId=… 로 읽음 처리 요청
    @MessageMapping("/chat.read/{roomId}/{messageId}")
    public void markRead(@DestinationVariable String roomId,
                         @DestinationVariable String messageId,
                         @Header("userId") String userId) {
        chatService.markAsRead(messageId, userId);
    }

    // REST로 초기 메시지 로드가 필요할 때 (옵션)
    @MessageMapping("/chat.history/{roomId}")
    @SendToUser("/queue/history")
    public List<Message> history(@DestinationVariable String roomId) {
        return chatService.getMessages(roomId);
    }
}