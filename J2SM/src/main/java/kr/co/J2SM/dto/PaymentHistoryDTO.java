package kr.co.J2SM.dto;

import jakarta.persistence.*;
import kr.co.J2SM.dto.company.CompanyDTO;
import kr.co.J2SM.entity.company.Company;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentHistoryDTO {
    private int pno; //PK
    private int price; //가격
    private LocalDate paymentDate; // 결제 날짜
    private String membership; // 멤버십
    private String type; // 결제 타입
    private String state; // 결제 상태
    private CompanyDTO company;

}
