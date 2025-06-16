package kr.co.J2SM.dto.kakao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class KakaoPayReadyResponse {
    private String tid;
    private String next_redirect_pc_url;
    private LocalDateTime created_at;
}