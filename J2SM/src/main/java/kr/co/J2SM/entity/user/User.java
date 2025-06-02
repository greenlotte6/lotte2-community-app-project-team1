package kr.co.J2SM.entity.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "user")
public class User {

    @Id
    private String uid;   //아아디
    private String pass;  //비밀번호
    private String name;  //이름
    private String email; //이메일
    private String hp;    //전화번호
    private String role;  //등급(유저, 관리자)
    private String company; //회사
    private String department; //부서
    private String Position; // 직책
    private String profileSname; // 프로필 변경 이름
    private String profileOname; // 프로필 기존 이름

    private String membership; // 요금제(Free, Basic, Standard, Premium  )
    
    @CreationTimestamp
    private LocalDateTime regDate;
    private LocalDateTime leaveDate;

    @PrePersist
    public void prePersist() {
        if (this.role == null) {
            this.role = "USER";
        }
    }

    // 사용자 권한 및 인가 설정을 hasRole() 메서드로 처리하기 위해 접두어 "ROLE_" 추가 
    public String getRole() {
        return "ROLE_"+role;
    }
}
