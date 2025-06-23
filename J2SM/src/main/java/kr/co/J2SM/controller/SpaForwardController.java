package kr.co.J2SM.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {
    @RequestMapping(value = "/{path:^(?!api|assets|static|images|css|js).*$}/**")
    public String forwardSPA() {
        return "forward:/index.html";
    }
}

