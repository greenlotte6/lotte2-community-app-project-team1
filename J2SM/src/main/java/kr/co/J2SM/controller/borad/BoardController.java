package kr.co.J2SM.controller.borad;


import com.nimbusds.jose.util.Resource;
import jakarta.transaction.Transactional;
import kr.co.J2SM.dto.ArticleDTO;
import kr.co.J2SM.dto.board.BoardDTO;
import kr.co.J2SM.entity.board.Board;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.service.board.BoardService;
import kr.co.J2SM.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<BoardDTO> write(
            @RequestPart("post") BoardDTO dto,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal User user) {

        log.info("게시물 저장: {}", dto);

        BoardDTO saved = boardService.createBoard(dto, file, user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/company/{companyId}/category/{categoryId}")
    public ResponseEntity<List<BoardDTO>> getBoardsByCategory(@PathVariable Long companyId, @PathVariable Long categoryId) {
        log.info("게시물 리스트 불러오기 : cno : " + categoryId);
        log.info("게시물 리스트 불러오기 : companyId : " + companyId);
        return ResponseEntity.ok(boardService.getBoardsByCategory(categoryId, companyId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getDetail(@PathVariable Long id) {
        log.info("게시글 불러오기");
        return ResponseEntity.ok(boardService.getBoardDetail(id));
    }

    @PutMapping("/{id}") // PUT 메서드로 매핑
    public ResponseEntity<BoardDTO> updateBoard(
            @PathVariable Long id,
            @RequestBody BoardDTO updatedDto,
            @AuthenticationPrincipal User user) {
        log.info("게시물 수정 요청: ID - {}, DTO - {}", id, updatedDto);
        try {
            BoardDTO result = boardService.updateBoard(id, updatedDto, user); // BoardService의 메서드 호출
            return ResponseEntity.ok(result); // 성공 시 200 OK와 수정된 DTO 반환
        } catch (IllegalArgumentException e) {
            log.error("게시물 수정 실패: {}", e.getMessage());
            // 권한 없음 또는 게시물 없음 등의 경우 403 Forbidden 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (Exception e) {
            log.error("게시물 수정 중 예상치 못한 오류 발생: {}", e.getMessage());
            // 다른 예외 발생 시 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/{id}") // DELETE 메서드로 매핑
    public ResponseEntity<Void> deleteBoard(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        log.info("게시물 삭제 요청: ID - {}", id);
        try {
            boardService.deleteBoard(id, user); // BoardService의 메서드 호출
            return ResponseEntity.noContent().build(); // 성공 시 204 No Content 반환
        } catch (IllegalArgumentException e) {
            log.error("게시물 삭제 실패: {}", e.getMessage());
            // 권한 없음 또는 게시물 없음 등의 경우 403 Forbidden 응답
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            log.error("게시물 삭제 중 예상치 못한 오류 발생: {}", e.getMessage());
            // 다른 예외 발생 시 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
