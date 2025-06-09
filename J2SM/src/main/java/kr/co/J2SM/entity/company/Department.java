package kr.co.J2SM.entity.company;

import jakarta.persistence.*;
import kr.co.J2SM.entity.user.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString(exclude = "users")
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

    // ↙ 사용자 리스트 매핑
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();

}
