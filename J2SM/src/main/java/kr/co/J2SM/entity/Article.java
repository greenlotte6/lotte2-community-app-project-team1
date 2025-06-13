package kr.co.J2SM.entity;

import jakarta.persistence.*;
import kr.co.J2SM.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;

    @Builder.Default
    private int parent = 0;

    @Builder.Default
    private int comment = 0;

    private String cate;
    // 공지사항, 사내게시판, 익명게시판, 12게시판

    // 회사이름

    // 회사이름 공지사항

    private String title;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer", referencedColumnName = "uid")
    private User writer;

    @Builder.Default
    private int file = 0;

    @Builder.Default
    private int hit = 0;

    private String regip;

    @CreationTimestamp
    private LocalDateTime rdate;

    private String nick;

}
