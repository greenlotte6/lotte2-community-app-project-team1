package kr.co.J2SM.service.kakao;

import kr.co.J2SM.dto.kakao.KakaoPayReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class KakaoPayService {

    @Value("${kakao.admin-key}")
    private String adminKey;

    private static final String CID = "TC0ONETIME"; // 테스트용

    public KakaoPayReadyResponse kakaoPayReady(String itemName, int quantity, int totalAmount) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", adminKey);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", CID);
        params.add("partner_order_id", "ORDER2025");
        params.add("partner_user_id", "USER2025");
        params.add("item_name", itemName);
        params.add("quantity", String.valueOf(quantity));
        params.add("total_amount", String.valueOf(totalAmount));
        params.add("vat_amount", "0");
        params.add("tax_free_amount", "0");
        params.add("approval_url", "http://localhost:3000/pay/success");
        params.add("cancel_url", "http://localhost:3000/pay/cancel");
        params.add("fail_url", "http://localhost:3000/pay/fail");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        ResponseEntity<KakaoPayReadyResponse> response = restTemplate.postForEntity(
                "https://kapi.kakao.com/v1/payment/ready", body, KakaoPayReadyResponse.class);

        return response.getBody();
    }

    public String kakaoPayApprove(String pgToken) {
        // 결제 승인 로직은 나중에 작성 가능
        return "결제 승인 완료 (pg_token = " + pgToken + ")";
    }
}
