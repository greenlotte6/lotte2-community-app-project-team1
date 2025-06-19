package kr.co.J2SM.controller;

import kr.co.J2SM.dto.user.DeptUsersDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.service.DepartmentUserService;
import kr.co.J2SM.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserGroupController {

    private final DepartmentUserService departmentUserService;
    private final UserService userService;

    @GetMapping("/department-groups")
    public List<DeptUsersDTO> getDepartmentGroups(@RequestParam String company) {
        System.out.println("==== [컨트롤러] department-groups 진입, company: " + company); // 로그 추가
        List<DeptUsersDTO> result = departmentUserService.getUserGroupsByCompany(company);
        System.out.println("==== [컨트롤러] 반환값: " + result); // result 값 출력(여기서 반드시!)
        return result;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyInfo(@AuthenticationPrincipal User user) {

        if(user != null){
            String uid = user.getUid();
            UserDTO userDTO = userService.findUser(uid);
            return ResponseEntity.ok(userDTO);
        }

        return ResponseEntity.ok(null);
    }

}