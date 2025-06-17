package kr.co.J2SM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

// 메시지 속도를 높이기 위해서 비동기 설정 추가(@EnableAsync)
@EnableAsync
@SpringBootApplication
public class J2SMApplication {

    public static void main(String[] args) {
        SpringApplication.run(J2SMApplication.class, args);
    }

}
