package kr.co.J2SM.service.chat;

import kr.co.J2SM.dto.company.DepartmentDTO;
import kr.co.J2SM.dto.user.DeptUsersDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.DepartmentRepository;
import kr.co.J2SM.repository.company.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatUserService {

    private final DepartmentRepository deptRepo;
    private final CompanyRepository companyRepo;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<DeptUsersDTO> findUserByCompany(int cno) {
        Company company = Company.builder().cno(cno).build();
        List<Department> departments = deptRepo.findByCompany(company);

        log.info("department : " + departments);

        List<DeptUsersDTO> deptDTOList = new ArrayList<>();
        for(Department department : departments){

            List<UserDTO> userDTOS = new ArrayList<>();

            for(User user : department.getUsers()){
                userDTOS.add(modelMapper.map(user, UserDTO.class));
            }

            DeptUsersDTO deptDTO = DeptUsersDTO.builder()
                    .departmentName(department.getDepartmentName())
                    .users(userDTOS)
                    .build();
            deptDTOList.add(deptDTO);

        }

        return deptDTOList;
    }
}
