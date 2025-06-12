package kr.co.J2SM.entity;

import jakarta.persistence.*;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.user.User;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "MyPage")
public class MyPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Lob // 긴 JSON 문자열
    private String content;

    @Column(name = "isFavorite")
    private boolean isFavorite = false;

    private boolean shared = false;

    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String title;

    private boolean isDeleted = false;

}
