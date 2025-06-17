package kr.co.J2SM.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.J2SM.dto.user.InviteDTO;
import kr.co.J2SM.service.InviteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/user/invite")
public class InviteController {
    private final InviteService inviteService;

    // 사원 초대
    @PostMapping
    public String invite(@RequestBody InviteDTO inviteDTO, HttpServletRequest request){
        log.info("사원 초대하기 :" + inviteDTO);

        // 초대 데이터 저장 (인증키는 6자리 숫자로 랜덤으로 생성)
        String inviteCode = inviteService.save(inviteDTO);

        // 베포 주소와 로컬 주소를 구별하기 위한 주소값
        String host = request.getServerName();

        // 사원 초대 메시지 전달하기
        inviteService.sendEmail(inviteCode, inviteDTO, host);
        return "success";


    }
}
