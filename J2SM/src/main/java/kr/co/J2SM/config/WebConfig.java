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

                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("Content-Disposition"); // 👈 이게 있어야 다운로드시 filename 노출됨
    }
}
