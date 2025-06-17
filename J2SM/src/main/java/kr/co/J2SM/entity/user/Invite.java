package kr.co.J2SM.entity.user;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "invite")
public class Invite {
    // 관리자가 사원을 초대할 때 검증하기 위한 테이블


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no; //초대 코드

    private String inviteCode; // 초대 코드

    private String company; // 회사명
    private String department; // 부서명
    private String position; // 직책
    private String name; // 초대하는 사람 이름
    private String email; // 초대하는 사람 이메일

}
