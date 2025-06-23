package kr.co.J2SM.dto.board;


import jakarta.persistence.*;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.board.Category;
import kr.co.J2SM.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class BoardDTO {
    private Long id;
    private CategoryDTO category; // 예: 공지사항, 사내게시판
    private boolean fixed; // true면 수정/삭제 불가
    private String createdBy; // 작성자
    private LocalDateTime createdAt; // 만든날짜
    private int hit;        // 조회수
    private String title;   // 제목
    private String content; //내용
    private UserDTO writer;
    private List<AttachmentDTO> attachments;

}
