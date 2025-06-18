package kr.co.J2SM.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.util.JWTProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class LoginResponseService {

    private final JWTProvider jwtProvider;

    public void setLoginResponse(HttpServletResponse response, User user) {
        String access = jwtProvider.createToken(user, 1);
        String refresh = jwtProvider.createToken(user, 7);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", access)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", refresh)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());

        // 응답 body 데이터도 함께 보내고 싶다면 JSON 생성 후 출력 가능
        // 예: department, company 정보 등
    }

    public Map<String, Object> getUserInfo(User user) {
        String department = user.getDepartment().getDno() + ":" + user.getDepartment().getDepartmentName();
        String company = user.getDepartment().getCompany().getCno() + ":" + user.getDepartment().getCompany().getCompanyName();

        Map<String, Object> map = new HashMap<>();
        map.put("grantType", "Bearer");
        map.put("username", user.getUid());
        map.put("nick", user.getName());
        map.put("department", department);
        map.put("company", company);
        map.put("membership", user.getMembership());

        return map;
    }
}