package kr.co.J2SM.controller.borad;


import kr.co.J2SM.dto.board.BoardDTO;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<BoardDTO> write(@RequestBody BoardDTO dto, @AuthenticationPrincipal User user) {
        log.info("게시물 저장 : " + dto);
        BoardDTO saved = boardService.createBoard(dto, user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<BoardDTO>> getBoardsByCategory(@PathVariable Long categoryId) {
        log.info("게시물 리스트 불러오기 : cno : " + categoryId);
        return ResponseEntity.ok(boardService.getBoardsByCategory(categoryId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getDetail(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.getBoardDetail(id));
    }
}
