package kr.co.J2SM.dto.board;

import kr.co.J2SM.dto.company.CompanyDTO;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {

    private Long id;
    private String name; // 게시판 카테고리 이름
    private String description; // 게시판 설명
    private CompanyDTO company;

    public CategoryDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

}