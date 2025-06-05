package kr.co.J2SM.controller;

import jakarta.validation.Valid;
import kr.co.J2SM.dto.inquire.TrialRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/qna")
@RequiredArgsConstructor
public class TrialRequestController {

    private final kr.co.J2SM.service.inquire.TrialRequestService trialRequestService;

    @PostMapping
    public ResponseEntity<String> submitInquiry(@Valid @RequestBody TrialRequestDTO dto) {
        System.out.println(dto.toString());
        System.out.println(dto.toString());
        System.out.println(dto.toString());
        trialRequestService.saveInquiry(dto);
        return ResponseEntity.ok("문의가 정상적으로 저장되었습니다.");
    }
}
