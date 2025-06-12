package kr.co.J2SM.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders(
                        "Content-Disposition",   // 대문자 정확히!
                        "content-disposition",   // 혹시 몰라서 추가
                        "Content-Type"
                )
                .allowCredentials(true);
    }
}
