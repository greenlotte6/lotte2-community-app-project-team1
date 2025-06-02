package kr.co.J2SM.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequiredArgsConstructor
@RestController
public class ConfigController {

    @Value("${spring.application.version}")
    private String version;

    @GetMapping("/version")
    public String version(){

        return version;
    }
}
