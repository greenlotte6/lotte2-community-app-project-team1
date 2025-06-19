package kr.co.J2SM.service.board;

import kr.co.J2SM.dto.board.CommentDTO;
import kr.co.J2SM.entity.board.Board;
import kr.co.J2SM.entity.board.Comment;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.board.BoardRepository;
import kr.co.J2SM.repository.board.CommentRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // 댓글 생성
    @Transactional
    public CommentDTO createComment(Long boardId, CommentDTO commentDTO, User currentUser) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다: " + boardId));

        User writer = userRepository.findById(currentUser.getUid())
                .orElseThrow(() -> new IllegalArgumentException("댓글 작성자(User)를 찾을 수 없습니다: " + currentUser.getUid()));

        Comment comment = Comment.builder()
                .board(board)
                .writer(writer)
                .content(commentDTO.getContent())
                .createdAt(LocalDateTime.now()) // 생성 시간 명시적 설정
                .build();

        Comment savedComment = commentRepository.save(comment);
        return toCommentDTO(savedComment);
    }

    // 특정 게시물의 댓글 조회
    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByBoardId(Long boardId) {
        return commentRepository.findByBoard_IdOrderByCreatedAtAsc(boardId)
                .stream()
                .map(this::toCommentDTO)
                .collect(Collectors.toList());
    }

    // 댓글 수정
    @Transactional
    public CommentDTO updateComment(Long commentId, CommentDTO updatedCommentDto, User currentUser) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다: " + commentId));

        // 권한 확인: 현재 로그인한 사용자가 댓글의 작성자와 일치하는지 확인
        if (!existingComment.getWriter().getUid().equals(currentUser.getUid())) {
            log.warn("댓글 수정 권한 없음: 댓글 작성자 UID={} vs 현재 사용자 UID={}", existingComment.getWriter().getUid(), currentUser.getUid());
            throw new IllegalArgumentException("이 댓글을 수정할 권한이 없습니다.");
        }

        // 내용 업데이트
        existingComment.setContent(updatedCommentDto.getContent());
        // 필요하다면 updatedAt 필드 추가 및 설정: existingComment.setUpdatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(existingComment);
        return toCommentDTO(savedComment);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long commentId, User currentUser) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다: " + commentId));

        // 권한 확인: 현재 로그인한 사용자가 댓글의 작성자와 일치하는지 확인
        if (!existingComment.getWriter().getUid().equals(currentUser.getUid())) {
            log.warn("댓글 삭제 권한 없음: 댓글 작성자 UID={} vs 현재 사용자 UID={}", existingComment.getWriter().getUid(), currentUser.getUid());
            throw new IllegalArgumentException("이 댓글을 삭제할 권한이 없습니다.");
        }

        commentRepository.delete(existingComment);
    }

    // Comment 엔티티를 CommentDTO로 변환하는 헬퍼 메서드
    private CommentDTO toCommentDTO(Comment comment) {
        // ModelMapper 사용 시 User 엔티티의 정보도 DTO로 잘 매핑되도록 설정 필요
        // 또는 UserDTO.from(comment.getWriter())와 같이 명시적으로 매핑
        return modelMapper.map(comment, CommentDTO.class);
    }
}
