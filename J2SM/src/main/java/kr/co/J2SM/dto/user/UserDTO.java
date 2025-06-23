package kr.co.J2SM.dto.user;

import kr.co.J2SM.dto.company.DepartmentDTO;
import kr.co.J2SM.entity.user.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

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
    private String newPass; // 새 비밀번호
    private String name;  //이름
    private String email; //이메일
    private String hp;    //전화번호
    private String role;  //등급(유저, 관리자)
    private String company; //회사
    private String Position; // 직책 (관리자: CEO)

    // 부서 정보
    private DepartmentDTO department;
    private String departmentName; //부서 (관리자는 총무팀 고정)

    private String profileImage; // 프로필 이미지

    private String membership; // 요금제(Free, Basic, Standard, Premium  )

    private MultipartFile profile; 

    private LocalDateTime regDate;
    private LocalDateTime leaveDate;

    private String tempcode; // 초대받은 임시 코드

    /* board */
    public static UserDTO from(User user) {
        if (user == null) return null;

        return UserDTO.builder()
                .uid(user.getUid())
                .name(user.getName())
                .build();


    }
}
