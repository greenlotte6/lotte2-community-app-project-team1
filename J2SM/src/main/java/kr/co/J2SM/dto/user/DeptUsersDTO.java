package kr.co.J2SM.dto.user;

import kr.co.J2SM.dto.company.CompanyDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeptUsersDTO {

   private String departmentName;
   private List<UserDTO> users;

}
