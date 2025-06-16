package kr.co.J2SM.dto.board;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardGroupDTO {
    private Long id;
    private String name;
    private boolean fixed;
    private String createdBy;
}
