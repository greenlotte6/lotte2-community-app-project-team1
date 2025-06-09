package kr.co.J2SM.controller.chat;

import kr.co.J2SM.dto.company.DepartmentDTO;
import kr.co.J2SM.dto.user.DeptUsersDTO;
import kr.co.J2SM.service.chat.ChatService;
import kr.co.J2SM.service.chat.ChatUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatUserController {

    private final ChatUserService chatUserService;

    @GetMapping("/users/by-company/{company}")
    public List<DeptUsersDTO> listUsersByCompany(
            @PathVariable("company") String company
    ) {
        // company가 "1:그린컴퓨터아카데미" 형태라면
        log.info("company : " + company);
        String[] parts = company.split(":");
        int cno = Integer.parseInt(parts[0]);
        return chatUserService.findUserByCompany(cno);
    }

}
