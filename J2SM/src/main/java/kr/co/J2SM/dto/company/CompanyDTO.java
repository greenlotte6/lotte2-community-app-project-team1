package kr.co.J2SM.dto.company;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyDTO {
    private int cno;
    private String companyName;
}
