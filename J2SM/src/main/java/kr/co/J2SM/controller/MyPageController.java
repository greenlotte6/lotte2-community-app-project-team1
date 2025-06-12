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
        log.info("⭐️ 받은 isFavorite: {}", myPageDTO.isFavorite());
        try {
            myPageService.save(myPageDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(">>> 저장 중 오류 발생", e); // 🔥 오류 내용 전체 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류: " + e.getMessage());
        }
    }

    @PutMapping("/trash/{id}")
    public ResponseEntity<?> moveToTrash(@PathVariable Long id) {
        myPageService.softDelete(id);
        return ResponseEntity.ok("휴지통으로 이동 완료");
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restoreFromTrash(@PathVariable Long id) {
        myPageService.restore(id);
        return ResponseEntity.ok("복원 완료");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePermanently(@PathVariable Long id) {
        myPageService.deletePermanently(id);
        return ResponseEntity.ok("영구 삭제 완료");
    }

    @GetMapping("/list")
    public ResponseEntity<List<MyPageDTO>> getAllActivePages() {
        return ResponseEntity.ok(myPageService.getAllActivePages());
    }

    @GetMapping("/trash")
    public ResponseEntity<List<MyPageDTO>> getTrashedPages() {
        return ResponseEntity.ok(myPageService.getTrashedPages());
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<MyPageDTO>> getAllActivePagesByUser(@PathVariable String userId) {
        return ResponseEntity.ok(myPageService.getAllActivePagesByUser(userId));
    }

    @GetMapping("/trash/{userId}")
    public ResponseEntity<List<MyPageDTO>> getTrashedPagesByUser(@PathVariable String userId) {
        return ResponseEntity.ok(myPageService.getTrashedPagesByUser(userId));
    }

}
