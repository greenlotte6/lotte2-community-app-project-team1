package kr.co.J2SM.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.J2SM.dto.MyPageDTO;
import kr.co.J2SM.dto.user.TermsDTO;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.security.MyUserDetails;
import kr.co.J2SM.service.MyPageService;
import kr.co.J2SM.service.UserService;
import kr.co.J2SM.util.CustomFileUtil;
import kr.co.J2SM.util.JWTProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mypage")
public class MyPageController {

    public final MyPageService myPageService;

    @PostMapping("/save")
    public ResponseEntity<?> saveMyPage(@RequestBody MyPageDTO myPageDTO) {
        myPageService.save(myPageDTO);
        return ResponseEntity.ok().build();
    }
}
