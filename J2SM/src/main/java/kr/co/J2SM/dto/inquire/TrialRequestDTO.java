package kr.co.J2SM.dto.inquire;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrialRequestDTO {

    private String id;

    private String company; // 회사 이름
    private String industry; // 산업
    private String name; // 문의자 이름
    private String email; // 이메일
    private String memo; // 문의 내용
    private String pass; // 문의 비밀번호
    private String status; // 상태(문의중, 답변완료)

    // 답변 내용
    // User 테이블의 답변자
    private String reply; // 답변 내용

    private LocalDateTime wdate; // 작성 날짜
    private LocalDateTime rdate; // 답변 날짜
}
