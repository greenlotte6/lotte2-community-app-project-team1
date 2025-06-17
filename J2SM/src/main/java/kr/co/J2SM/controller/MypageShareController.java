package kr.co.J2SM.controller;

import kr.co.J2SM.dto.MypageShareRequestDTO;
import kr.co.J2SM.dto.MypageShareResponseDTO;
import kr.co.J2SM.service.MypageShareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/mypage/share")
public class MypageShareController {

    private final MypageShareService mypageShareService;

    @PostMapping
    public ResponseEntity<?> shareMypage(@RequestBody MypageShareRequestDTO dto) {
        System.out.println("[DEBUG] 받은 dto: " + dto); // 추가
        System.out.println("[DEBUG] 받은 dto: " + dto); // 추가
        System.out.println("[DEBUG] 받은 dto: " + dto); // 추가
        mypageShareService.shareMypage(dto);
        return ResponseEntity.ok("공유 완료");
    }

    @GetMapping("/received/{userId}")
    public List<MypageShareResponseDTO> getReceivedShares(@PathVariable String userId) {
        System.out.println("공유받은 페이지 요청 userId: " + userId); // 여기 추가
        return mypageShareService.findAllReceivedShares(userId);
    }
}

