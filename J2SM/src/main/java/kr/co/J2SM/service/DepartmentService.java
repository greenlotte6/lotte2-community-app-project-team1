package kr.co.J2SM.service;

import kr.co.J2SM.dto.company.DepartmentDTO;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    public List<DepartmentDTO> findAll(int cno) {

        Company company = Company.builder()
                .cno(cno)
                .build();
        List<Department> departments = departmentRepository.findByCompany(company);
        return departments.stream()
                .map(department -> modelMapper.map(department, DepartmentDTO.class))
                .toList();
    }
}
