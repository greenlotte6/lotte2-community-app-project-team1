package kr.co.J2SM.dto.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserDTO {

    private String uid;   //아아디
    private String pass;  //비밀번호
    private String name;  //이름
    private String email; //이메일
    private String hp;    //전화번호
    private String role;  //등급(유저, 관리자)
    private String company; //회사
    private String department; //부서

    private String profileSname; // 프로필 변경 이름
    private String profileOname; // 프로필 기존 이름

    private String membership; // 요금제(Free, Basic, Standard, Premium  )

    private LocalDateTime regDate;
    private LocalDateTime leaveDate;

}
