package kr.co.J2SM.entity;

import jakarta.persistence.*;
import kr.co.J2SM.entity.company.Company;
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

    private Long userId;

    @Lob // 긴 JSON 문자열
    private String content;

    @Builder.Default
    private boolean isFavorite = false;

    @Builder.Default
    private boolean shared = false;

    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String title;

    private boolean isDeleted = false;
}
