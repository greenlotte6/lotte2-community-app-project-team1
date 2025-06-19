package kr.co.J2SM.oauth2;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.security.MyUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Log4j2
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final LoginResponseService loginResponseService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        // ✅ JWT 쿠키 세팅
        loginResponseService.setLoginResponse(response, user);

        // ✅ 요청 정보 기반 리다이렉트 경로 설정
        String serverName = request.getServerName();
        String redirectUrl;


        log.info("serverName: {}", serverName);

        // 예시 분기 (원하는 기준으로 수정 가능)
        if (serverName.contains("localhost")) {
            redirectUrl = "http://localhost:5173/dashboard/main";
        } else {
            redirectUrl = "https://lotte2-community-app-project-team1-sandy.vercel.app/dashboard/main";
        }


        // ✅ React 앱으로 리다이렉트
        response.sendRedirect(redirectUrl);
    }
}
