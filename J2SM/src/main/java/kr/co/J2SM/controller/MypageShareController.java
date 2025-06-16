package kr.co.J2SM.controller;

import kr.co.J2SM.dto.MypageShareRequestDTO;
import kr.co.J2SM.service.MypageShareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/mypage/share")
public class MypageShareController {

    private final MypageShareService mypageShareService;

    @PostMapping
    public ResponseEntity<?> shareMypage(@RequestBody MypageShareRequestDTO dto) {
        mypageShareService.shareMypage(dto);
        return ResponseEntity.ok("공유 완료");
    }
}

