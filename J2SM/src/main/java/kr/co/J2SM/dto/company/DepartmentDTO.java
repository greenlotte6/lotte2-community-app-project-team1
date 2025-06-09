package kr.co.J2SM.dto.company;

import jakarta.persistence.*;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.company.Company;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepartmentDTO {
    private Long dno;
    private String departmentName;
    private CompanyDTO company;

}
