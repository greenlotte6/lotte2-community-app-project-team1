package kr.co.J2SM.entity.board;

import jakarta.persistence.*;
import kr.co.J2SM.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "board")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category; // 예: 공지사항, 사내게시판

    @Column(name = "is_fixed")
    private boolean fixed; // true면 수정/삭제 불가

    @Column(name = "created_by")
    private String createdBy; // 작성자

    @CreationTimestamp
    private LocalDateTime createdAt; // 만든날짜

    private int hit;        // 조회수
    private String title;   // 제목
    private String content; //내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer", referencedColumnName = "uid")
    private User writer;

    // 파일 + 댓글

    @PrePersist
    public void onCreate() {
        this.createdAt = java.time.LocalDateTime.now();
    }

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default // Builder 패턴 사용 시 List 필드 초기화
    private List<Comment> comments = new ArrayList<>();


}
