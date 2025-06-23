package kr.co.J2SM.dto.board;

import kr.co.J2SM.dto.user.UserDTO; // UserDTO import
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    private Long boardId; // 댓글이 속한 게시글 ID
    private UserDTO writer; // 댓글 작성자 정보 (uid, name 등)
    private String content; // 댓글 내용
    private LocalDateTime createdAt; // 댓글 작성 시간


}
