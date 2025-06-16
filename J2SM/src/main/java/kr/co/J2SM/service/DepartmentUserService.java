package kr.co.J2SM.service;

import kr.co.J2SM.dto.user.DeptUsersDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DepartmentUserService {
    private final DepartmentRepository departmentRepository;


    // 회사명으로 부서-유저 그룹핑 DTO 반환
    @Transactional(readOnly = true)
    public List<DeptUsersDTO> getUserGroupsByCompany(String companyName) {
        System.out.println("==== [서비스] getUserGroupsByCompany, companyName: " + companyName); // 로그
        // companyName으로 부서 리스트 조회 (users까지 fetch)
        List<Department> departments = departmentRepository.findAllWithUsersByCompanyName(companyName);

        return departments.stream()
                .map(department -> DeptUsersDTO.builder()
                        .departmentName(department.getDepartmentName())
                        .users(department.getUsers().stream().map(user ->
                                UserDTO.builder()
                                        .uid(user.getUid())
                                        .name(user.getName())
                                        .Position(user.getPosition())
                                        .email(user.getEmail())
                                        .profileImage(user.getProfileImage())
                                        .company(department.getCompany().getCompanyName()) // 🔥 회사명
                                        .departmentName(department.getDepartmentName())    // 🔥 부서명
                                        // ...필요한 필드만
                                        .build()
                        ).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }
}