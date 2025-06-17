package kr.co.J2SM.controller.kakao;

import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<?> kakaoPayReady(@RequestBody Map<String, Object> request, HttpServletRequest requestServlet) {
        String itemName = (String) request.get("itemName");
        int totalAmount = (int) request.get("totalAmount");
        int quantity = (int) request.get("quantity");

        // 베포 주소와 로컬 주소를 구별하기 위한 주소값
        String host = requestServlet.getServerName();

        return ResponseEntity.ok(kakaoPayService.kakaoPayReady(itemName, quantity, totalAmount, host));
    }

    @GetMapping("/success")
    public ResponseEntity<?> kakaoPaySuccess(@RequestParam String pg_token) {
        Map<String, Object> result = Map.of(
                "status", "success",
                "message", "결제 승인 완료",
                "pg_token", pg_token
        );
        return ResponseEntity.ok(result);
    }


}