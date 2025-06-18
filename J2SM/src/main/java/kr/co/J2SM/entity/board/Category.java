package kr.co.J2SM.entity.board;

import jakarta.persistence.*;
import kr.co.J2SM.entity.company.Company;
import lombok.*;

@Entity
@Table(name = "category")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    // 게시판 카테고리
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // 게시판 카테고리 이름
    private String description; // 게시판 설명

    // 회사별로 구분
    @ManyToOne
    @JoinColumn(name = "company")
    private Company company;

}