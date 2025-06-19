package kr.co.J2SM.entity.board;

import jakarta.persistence.*;
import kr.co.J2SM.entity.user.User; // 댓글 작성자 User 엔티티 import
import lombok.*;
import org.hibernate.annotations.CreationTimestamp; // 자동 생성 시간 스탬프

import java.time.LocalDateTime;

@Entity
@Table(name = "board_comment") // 댓글 테이블명 (예시)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 댓글 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false) // 어떤 게시물에 달린 댓글인지
    private Board board; // Board 엔티티 참조

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_uid", referencedColumnName = "uid", nullable = false) // 댓글 작성자
    private User writer; // User 엔티티 참조 (작성자 정보)

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 댓글 내용

    @CreationTimestamp // 댓글 생성 시 자동으로 현재 시간 기록
    private LocalDateTime createdAt; // 댓글 작성 시간

}
