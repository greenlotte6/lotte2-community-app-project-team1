package kr.co.J2SM.entity.board;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "board_group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // 예: 공지사항, 사내게시판

    @Column(name = "is_fixed")
    private boolean fixed; // true면 수정/삭제 불가

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
    }
}
