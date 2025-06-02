package kr.co.J2SM.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.J2SM.dto.UserDTO;
import kr.co.J2SM.service.UserService;
import kr.co.J2SM.util.JWTProvider;
import kr.co.J2SM.dto.TermsDTO;
import kr.co.J2SM.entity.User;
import kr.co.J2SM.security.MyUserDetails;
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

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserDTO userDTO){

        log.info("login...1 : " + userDTO);
        try {
            // Security 인증 처리
            UsernamePasswordAuthenticationToken authToken
                    = new UsernamePasswordAuthenticationToken(userDTO.getUid(), userDTO.getPass());

            // 사용자 DB 조회
            Authentication authentication = authenticationManager.authenticate(authToken);
            log.info("login...2");

            // 인증된 사용자 가져오기
            MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();

            log.info("login...3 : " + user);


            // 토큰 발급(액세스, 리프레쉬)
            String access  = jwtProvider.createToken(user, 1); // 1일
            String refresh = jwtProvider.createToken(user, 7); // 7일

            // 리프레쉬 토큰 DB 저장

            //httpOnly Cookie 생성
            ResponseCookie accessTokenCookie= ResponseCookie.from("access_token", access)
                                                    .httpOnly(true) //httpOnly 설정(XSS 방지)
                                                    .secure(false)  //https only
                                                    .path("/")      //쿠키 경로
                                                    .maxAge(Duration.ofDays(1)) //쿠키 수명
                                                    .build();

            ResponseCookie refreshTokenCookie= ResponseCookie.from("refresh_token", refresh)
                                                    .httpOnly(true) //httpOnly 설정(XSS 방지)
                                                    .secure(false)  //https only
                                                    .path("/")      //쿠키 경로
                                                    .maxAge(Duration.ofDays(7)) //쿠키 수명
                                                    .build();
            
            //쿠키를 Response 헤더에 추가
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
            headers.add(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

            // 액세스 토큰 클라이언트 전송
            Map<String, Object> map = new HashMap<>();
            map.put("grantType", "Bearer");
            map.put("username", user.getUid());
            //map.put("accessToken", access);
            //map.put("refreshToken", refresh);

            return ResponseEntity.ok().headers(headers).body(map);

        }catch (Exception e){
            log.info("login...3 : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity logout(){
        //httpOnly Cookie 생성
        ResponseCookie accessTokenCookie= ResponseCookie.from("access_token", "")
                .httpOnly(true) //httpOnly 설정(XSS 방지)
                .secure(false)  //https only
                .path("/")      //쿠키 경로
                .maxAge(0) //쿠키 수명
                .build();

        ResponseCookie refreshTokenCookie= ResponseCookie.from("refresh_token", "")
                .httpOnly(true) //httpOnly 설정(XSS 방지)
                .secure(false)  //https only
                .path("/")      //쿠키 경로
                .maxAge(0) //쿠키 수명
                .build();

        //쿠키를 Response 헤더에 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok().headers(headers).body(null);
    }

    @PostMapping
    public Map<String, String> register(@RequestBody UserDTO userDTO){

        log.info(userDTO);

        String uid = userService.register(userDTO);
        return Map.of("userid", uid);
    }

    @GetMapping("/terms")
    public ResponseEntity terms(){
        TermsDTO termsDTO = userService.terms();
        return ResponseEntity.ok(termsDTO);
    }

    @GetMapping("/idCheck")
    public ResponseEntity<Boolean> idCheck(@RequestParam("uid") String uid){
        boolean exist = userService.existId(uid);
        return ResponseEntity.ok(exist);
    }

    @GetMapping("/idCheck/success")
    public ResponseEntity idCheck(@RequestParam("uid") String uid,
                                  @RequestParam("pass") String pass,
                                  HttpServletRequest req){

        System.out.println(uid);
        System.out.println(pass);

        HttpSession session = req.getSession();

        UserDTO userDTO = UserDTO.builder()
                .uid(uid)
                .pass(pass)
                .build();
        session.setAttribute("user",userDTO);

        return ResponseEntity.ok("ok");
    }

    @GetMapping("/idCheck/test")
    public ResponseEntity idCheck(
                                  HttpServletRequest req){
        HttpSession session = req.getSession();

        UserDTO userDTO = (UserDTO) session.getAttribute("user");
        System.out.println(userDTO);

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/emailCheck")
    public ResponseEntity emailCheck(@RequestParam("email") String email,
                                        HttpServletRequest req){

        HttpSession session = req.getSession();

        UserDTO userDTO = (UserDTO) session.getAttribute("user");
        Boolean exist = userService.findUserEmail(email);

        if(exist == true && userDTO != null){
            userDTO.setEmail(email);
        }

        return ResponseEntity.ok(exist);
    }

    @GetMapping("/emailSend")
    public ResponseEntity emailSend(@RequestParam("email") String email,
                                      HttpServletRequest req){

        log.info("email 인증 코드 전송 : " + email);

        String code = userService.sendEmailCode(email);

        HttpSession session = req.getSession();
        session.setAttribute("AuthCode", code);

        return ResponseEntity.ok(code);
    }

    @GetMapping("/emailCodeValid")
    public ResponseEntity codeValid(@RequestParam("code") String code,
                                    HttpServletRequest req){

        HttpSession session = req.getSession();
        String AuthCode = (String) session.getAttribute("AuthCode");

        System.out.println(AuthCode);
        System.out.println(code);


        if(AuthCode.equals(code)){
            return ResponseEntity.ok("인증 성공");    
        }else{
            return ResponseEntity.ok("인증실패");
        }

    }


}
