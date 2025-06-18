package kr.co.J2SM.entity.company;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "membership_payment")
public class Membership {
    // 멤버십 결제 내역

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    @ManyToOne
    private Company company;

    private String type; // 결제한 멤버십 종류 (ex: FREE, BASIC, PRO)
    private int price; // 가격
    private String paymentMethod; // 결제 수단 (예: KAKAO_PAY, CARD 등)
    private String status; // 결제 상태 (예: SUCCESS, FAIL, CANCEL)

    private LocalDate startDate; // 시작 날짜
    private LocalDate  endDate; // 종료 날짜

}
