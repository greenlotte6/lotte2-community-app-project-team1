package kr.co.J2SM.dto.user;

import jakarta.persistence.Id;
import kr.co.J2SM.dto.company.CompanyDTO;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InviteDTO {
    // 관리자가 사원을 초대할 때 검증하기 위한 객체
    private int no;
    private String inviteCode; //초대 코드
    private String companyName; // 회사명
    private String department; // 부서명
    private String position; // 직책
    private String name; // 초대하는 사람 이름
    private String email; // 초대하는 사람 이메일
    private CompanyDTO company;
    private int cno;


}
