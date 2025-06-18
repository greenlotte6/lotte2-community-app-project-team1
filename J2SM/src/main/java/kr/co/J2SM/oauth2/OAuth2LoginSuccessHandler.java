package kr.co.J2SM.oauth2;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Map;

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

        // ✅ 사용자 정보도 JSON으로 반환 (redirect 대신)
        Map<String, Object> userInfo = loginResponseService.getUserInfo(user);

        log.info("userInfo: {}", userInfo);

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        new ObjectMapper().writeValue(response.getWriter(), userInfo);
    }
}