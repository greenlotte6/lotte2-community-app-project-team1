package kr.co.J2SM.oauth2;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.user.UserRepository;
import kr.co.J2SM.security.MyUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class Oauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String provider = request.getClientRegistration().getRegistrationId();
        log.info("provider: {}", provider);

        String email = null;
        String name = null;

        if ("kakao".equals(provider)) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            email = (String) kakaoAccount.get("email");
            name = (String) profile.get("nickname");
        } else if ("naver".equals(provider)) {
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");
            email = (String) response.get("email");
            name = (String) response.get("name");
        } else {
            // Google
            email = (String) attributes.get("email");
            name = (String) attributes.get("name");
        }

        String uidPrefix = provider.substring(0, 1).toUpperCase() + "_";
        String uid = uidPrefix + email.substring(0, email.indexOf("@"));

        // DB 조회 : 이메일에 맞는게 있는지 확인

        log.info("email: {}", email);

        Optional<User> optUser = userRepository.findByEmail(email);
        User user;
        if (optUser.isPresent()) {
            user = optUser.get();
            log.info(user);

            return MyUserDetails.builder()
                    .user(user)
                    .attributes(attributes)
                    .build();
        }

        return null;
    }
}