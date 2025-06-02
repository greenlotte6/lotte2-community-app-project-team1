package kr.co.J2SM.entity.company;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dno;

    private String departmentName;

    @ManyToOne
    @JoinColumn(name = "company")
    private Company company;

}
