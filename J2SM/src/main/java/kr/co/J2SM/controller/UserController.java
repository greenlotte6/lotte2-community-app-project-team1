package kr.co.J2SM.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.J2SM.dto.user.UserDTO;
import kr.co.J2SM.service.UserService;
import kr.co.J2SM.util.CustomFileUtil;
import kr.co.J2SM.util.JWTProvider;
import kr.co.J2SM.dto.user.TermsDTO;
import kr.co.J2SM.entity.user.User;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final CustomFileUtil fileUtil;
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

            // 회사 정보
            String department = user.getDepartment().getDno()
                    + ":" + user.getDepartment().getDepartmentName();
            String company = user.getDepartment().getCompany().getCno()
                    + ":" + user.getDepartment().getCompany().getCompanyName() ;

            // 액세스 토큰 클라이언트 전송
            Map<String, Object> map = new HashMap<>();
            map.put("grantType", "Bearer");
            
            // 회원 정보
            map.put("username", user.getUid());
            map.put("nick", user.getName());
            map.put("department", department);
            map.put("company", company);
            map.put("membership", user.getMembership());

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
    public Map<String, String> register(UserDTO userDTO, HttpServletRequest req){

        // 이미지 등록

        List<MultipartFile> files = new ArrayList<>();
        files.add(userDTO.getProfile());

        Map<String, String> uploadFileNames = fileUtil.saveFiles(files);
        userDTO.setProfileImage( uploadFileNames.get("profile"));

        // 관리자 등록 할 때 uid는 세션으로 가져옴으로서 uid는 null
        if(userDTO.getUid() == null){
            // 관리자 회원 가입 로직

            HttpSession session = req.getSession();
            UserDTO user = (UserDTO) session.getAttribute("user");

            if(user != null){
                userService.register(userDTO, user);
            }
        }else{
            // 일반 회원가입 로직
        }

        log.info(userDTO);

        // String uid = userService.register(userDTO);
        String uid = "user";
        return Map.of("userid", uid);
    }

    @GetMapping("/terms")
    public ResponseEntity terms(){
        TermsDTO termsDTO = userService.terms();
        return ResponseEntity.ok(termsDTO);
    }
    
    
    // 아이디 검증 메서드
    @GetMapping("/idCheck")
    public ResponseEntity<Boolean> idCheck(@RequestParam("uid") String uid){
        boolean exist = userService.existId(uid);
        return ResponseEntity.ok(exist);
    }

    // 휴대폰 검증 메서드
    @GetMapping("/hpCheck")
    public ResponseEntity<Boolean> hpCheck(@RequestParam("hp") String hp){
        boolean exist = userService.existHp(hp);
        log.info("휴대폰 검증 결과 : " + exist);
        return ResponseEntity.ok(exist);
    }
    
    @GetMapping("/findHp")
    public ResponseEntity findHp(@RequestParam("hp") String hp){
        String uid = userService.findUidByHp(hp);
        return ResponseEntity.ok(uid);
    }

    // 아이디 검증 성공 시 세션 저장
    @GetMapping("/idCheck/success")
    public ResponseEntity idCheck(@RequestParam("uid") String uid,
                                  @RequestParam("pass") String pass,
                                  HttpServletRequest req){
        
        HttpSession session = req.getSession();

        UserDTO userDTO = UserDTO.builder()
                .uid(uid)
                .pass(pass)
                .membership((String) session.getAttribute("membership"))
                .build();

        log.info("아이디 검증 성공 시 " + userDTO);

        session.setAttribute("user",userDTO);

        return ResponseEntity.ok("ok");
    }
    
    // 이메일 중복 체크
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

    // 이메일 코드 전송
    @GetMapping("/emailSend")
    public ResponseEntity emailSend(@RequestParam("email") String email,
                                      HttpServletRequest req){

        log.info("email 인증 코드 전송 : " + email);

        String code = userService.sendEmailCode(email);

        HttpSession session = req.getSession();
        session.setAttribute("AuthCode", code);
        session.setAttribute("email", email);

        return ResponseEntity.ok(code);
    }

    // 이메일 코드 검증
    @GetMapping("/emailCodeValid")
    public ResponseEntity codeValid(@RequestParam("code") String code,
                                    HttpServletRequest req){

        HttpSession session = req.getSession();
        String AuthCode = (String) session.getAttribute("AuthCode");


        if(AuthCode.equals(code)){

            UserDTO userDTO = (UserDTO) session.getAttribute("user");
            if(userDTO != null){
                userDTO.setEmail( (String) session.getAttribute("email"));
                session.setAttribute("user", userDTO);
            }

            return ResponseEntity.ok("인증 성공");    
        }else{
            return ResponseEntity.ok("인증실패");
        }

    }

    @PostMapping("/membership")
    public ResponseEntity membership(@RequestBody UserDTO userDTO,
                                     HttpServletRequest req){
        
        HttpSession session = req.getSession();
        session.setAttribute("membership", userDTO.getMembership());
        log.info("membership : " + userDTO.getMembership());
        return ResponseEntity.ok("ok");

    }

    @PostMapping("/modify")
    public ResponseEntity modifyPass(@RequestBody UserDTO userDTO) {
        log.info("비밀번호 변경 : " + userDTO);
        Boolean success = userService.modifyPass(userDTO);
        return ResponseEntity.ok(success);
    }



        /* 테스트 용 곧 삭제 */
    @GetMapping("/company")
    public ResponseEntity company(){
        userService.companyAll();
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

    @GetMapping("/me")
    public User getMyInfo(@AuthenticationPrincipal MyUserDetails userDetails) {
        return userDetails.getUser(); // React에서 사용
    }

    @GetMapping("/info")
    public ResponseEntity<UserDTO> userInfo (@AuthenticationPrincipal User user){
        UserDTO userDTO = userService.findByUser(user);
        System.out.println(userDTO);
        return ResponseEntity.ok(userDTO);
    }



}
