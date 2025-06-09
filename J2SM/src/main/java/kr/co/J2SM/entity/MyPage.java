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

    private boolean isFavorite;
    private boolean shared;

    private LocalDateTime createdAt;
}
