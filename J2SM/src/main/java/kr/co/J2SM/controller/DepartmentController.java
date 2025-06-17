package kr.co.J2SM.controller;

import kr.co.J2SM.dto.company.DepartmentDTO;
import kr.co.J2SM.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    // 부서 컨트롤러
    @GetMapping("/info/{cno}")
    public List<DepartmentDTO> departments(@PathVariable int cno) {
        log.info("부서 정보 불러오기 ");
        List<DepartmentDTO> departments = departmentService.findAll(cno);
        log.info("부서 정보 불러오기 " + departments);
        return departments;
    }
}
