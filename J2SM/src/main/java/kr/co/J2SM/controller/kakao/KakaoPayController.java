package kr.co.J2SM.controller.kakao;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import kr.co.J2SM.service.kakao.KakaoPayService;

import java.util.Map;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pay")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    @PostMapping("/ready")
    public ResponseEntity<?> kakaoPayReady(@RequestBody Map<String, Object> request) {
        String itemName = (String) request.get("itemName");
        int totalAmount = (int) request.get("totalAmount");
        int quantity = (int) request.get("quantity");

        return ResponseEntity.ok(kakaoPayService.kakaoPayReady(itemName, quantity, totalAmount));
    }

    @GetMapping("/success")
    public ResponseEntity<?> kakaoPaySuccess(@RequestParam String pg_token) {
        return ResponseEntity.ok(kakaoPayService.kakaoPayApprove(pg_token));
    }
}