package kr.co.J2SM.security;

import kr.co.J2SM.oauth2.OAuth2LoginSuccessHandler;
import kr.co.J2SM.util.JWTProvider;
import kr.co.J2SM.security.filter.JWTAuthenticationFilter;
import kr.co.J2SM.util.JWTProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JWTProvider jwtProvider;

    @Autowired
    private OAuth2UserService oauth2UserService;

    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        // 토큰기반 인증 시큐리티 설정
        httpSecurity
                .cors(cors -> cors
                        .configurationSource(corsConfigurationSource())
                )
                .csrf(CsrfConfigurer::disable)              // 사이트 위변조 방지
                .httpBasic(HttpBasicConfigurer::disable)    // 기본 HTTP 인증 방식 비활성
                .formLogin(FormLoginConfigurer::disable)
                .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 비활성
                // 토큰 검사 필터 등록
                .addFilterBefore(new JWTAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        //.requestMatchers("/article/**").hasAnyRole("ADMIN", "USER") <- 프론트에서 테스트할 때 인가 처리 아래처럼 수정
                        .requestMatchers(HttpMethod.GET,"/article/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/article/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET,"/product/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/product/**").hasRole("ADMIN")
                        .anyRequest().permitAll())

                // ✅ 소셜 로그인 설정 추가
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/user/login")
                        .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler((request, response, exception) -> {
                            log.error("🔥 OAuth2 로그인 실패: {}", exception.getMessage(), exception);

                            // 프론트에서 처리 가능한 경로로 리다이렉트 (SPA용)
                            response.sendRedirect("https://lotte2-community-app-project-team1-sandy.vercel.app/user/login?error");
                        })
                );


        return httpSecurity.build();
    }

    // Security 인증 암호화 인코더 설정
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(
                java.util.List.of(
                        "http://localhost:5173",
                        "http://127.0.0.1:5173",
                        "https://lotte2-community-app-project-team1-sandy.vercel.app"
                        "https://www.j2sm.site"
                )
        );
        config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(java.util.List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
