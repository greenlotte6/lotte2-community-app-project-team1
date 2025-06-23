package kr.co.J2SM.controller.borad;

import kr.co.J2SM.dto.board.CommentDTO;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.service.board.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/boards/{boardId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 생성
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @PathVariable Long boardId,
            @RequestBody CommentDTO commentDTO,
            @AuthenticationPrincipal User user) {
        try {
            CommentDTO savedComment = commentService.createComment(boardId, commentDTO, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
        } catch (IllegalArgumentException e) {
            log.error("댓글 생성 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            log.error("댓글 생성 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 특정 게시물의 댓글 조회
    @GetMapping
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long boardId) {
        List<CommentDTO> comments = commentService.getCommentsByBoardId(boardId);

        log.info(boardId + "의 게시물의 댓글 내용은 " + comments);
        return ResponseEntity.ok(comments);
    }

    // 댓글 수정 (PUT 요청)
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable Long boardId, // 게시물 ID는 경로의 일관성을 위해 유지하거나 제거 가능
            @PathVariable Long commentId,
            @RequestBody CommentDTO commentDTO, // 수정할 댓글 내용이 담긴 DTO
            @AuthenticationPrincipal User user) {
        log.info("댓글 수정 요청: boardId={}, commentId={}, content={}", boardId, commentId, commentDTO.getContent());
        try {
            CommentDTO updatedComment = commentService.updateComment(commentId, commentDTO, user);
            return ResponseEntity.ok(updatedComment);
        } catch (IllegalArgumentException e) {
            log.error("댓글 수정 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // 권한 없음 또는 댓글 없음
        } catch (Exception e) {
            log.error("댓글 수정 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 댓글 삭제 (DELETE 요청)
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long boardId, // 게시물 ID는 경로의 일관성을 위해 유지하거나 제거 가능
            @PathVariable Long commentId,
            @AuthenticationPrincipal User user) {
        log.info("댓글 삭제 요청: boardId={}, commentId={}", boardId, commentId);
        try {
            commentService.deleteComment(commentId, user);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (IllegalArgumentException e) {
            log.error("댓글 삭제 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음 또는 댓글 없음
        } catch (Exception e) {
            log.error("댓글 삭제 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
