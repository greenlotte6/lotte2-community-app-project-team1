package kr.co.J2SM.entity;

import jakarta.persistence.*;
import kr.co.J2SM.entity.company.Company;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "payment_history")
public class PaymentHistory {
    
    // 관리자 페이지 - 결제 내역

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pno; //PK

    private int price; //가격
    private LocalDate paymentDate; // 결제 날짜
    private String membership; // 멤버십
    private String type; // 결제 타입
    private String state; // 결제 상태

    @ManyToOne
    @JoinColumn(name = "company")
    private Company company;

    @PrePersist
    public void prePersist() {
        state = this.state = "정상";
    }
}
