package kr.co.J2SM.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    // HTTP/CORS 전역 설정

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        // RESTfull 서비스를 위한 CORS 설정
        registry
                .addMapping("/**")        // 모든 엔드포인트에 대한 접근허용
                //.allowedOriginPatterns("http://127.0.0.1:5173", "http://localhost:5174")
                //.allowedOriginPatterns("*", "https://lotte2-community-app-project-team1-sandy.vercel.app")
                //.allowedOriginPatterns(
                //        "https://www.j2sm.site",
                //        "https://lotte2-community-app-project-team1-sandy.vercel.app",
                //        "http://localhost:5173"
                //)
                .allowedOrigins(
                        "https://www.j2sm.site",
                        "https://lotte2-community-app-project-team1-sandy.vercel.app",
                        "https://api.j2sm.site"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // 허용할 Methods 설정
                .allowedHeaders("*")        // 모든 헤더 정보 허용
                .allowCredentials(true)     // 자격 증명 허용
                .maxAge(3600);              // pre-flight 요청의 유효시간 설정
    }
}
