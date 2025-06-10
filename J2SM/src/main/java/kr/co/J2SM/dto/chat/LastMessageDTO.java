package kr.co.J2SM.dto.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class LastMessageDTO {
    /** 메시지를 보낸 사용자 ID */
    private String senderId;
    private String senderName;

    /** 메시지 내용 */
    private String text;

    /** 메시지 전송 시각 */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sentAt;
}
