package kr.co.J2SM.service.board;

import kr.co.J2SM.dto.board.CommentDTO;
import kr.co.J2SM.dto.user.UserDTO; // UserDTO import 추가
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
    private final UserRepository userRepository; // User 엔티티 조회 등 필요할 경우를 위해 유지
    private final ModelMapper modelMapper; // 다른 단순 필드 매핑에 사용

    /**
     * 댓글을 생성합니다.
     *
     * @param boardId 댓글이 속할 게시글의 ID
     * @param commentDTO 생성할 댓글의 내용이 담긴 DTO
     * @param currentUser 현재 로그인한 사용자 (댓글 작성자)
     * @return 생성된 댓글의 DTO
     * @throws IllegalArgumentException 게시글을 찾을 수 없거나 작성자 정보를 찾을 수 없을 경우
     */
    @Transactional
    public CommentDTO createComment(Long boardId, CommentDTO commentDTO, User currentUser) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다: " + boardId));

        // @AuthenticationPrincipal로 넘어온 currentUser는 이미 인증된 User 엔티티이므로,
        // 별도로 userRepository.findById()를 통해 다시 조회할 필요가 없습니다.
        User writer = currentUser;

        Comment comment = Comment.builder()
                .board(board)
                .writer(writer) // 인증된 User 객체를 작성자로 설정
                .content(commentDTO.getContent())
                .createdAt(LocalDateTime.now()) // 댓글 생성 시간 설정
                .build();

        Comment savedComment = commentRepository.save(comment);
        // 저장된 댓글 엔티티를 DTO로 변환하여 반환 (작성자 정보 포함)
        return toCommentDTO(savedComment);
    }

    /**
     * 특정 게시글의 모든 댓글을 조회합니다.
     *
     * @param boardId 댓글을 조회할 게시글의 ID
     * @return 해당 게시글의 댓글 목록 DTO
     */
    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByBoardId(Long boardId) {
        return commentRepository.findByBoard_IdOrderByCreatedAtAsc(boardId)
                .stream()
                .map(this::toCommentDTO) // 각 댓글 엔티티를 DTO로 변환 (작성자 정보 포함)
                .collect(Collectors.toList());
    }

    /**
     * 댓글을 수정합니다.
     *
     * @param commentId 수정할 댓글의 ID
     * @param updatedCommentDto 수정할 내용이 담긴 DTO
     * @param currentUser 현재 로그인한 사용자
     * @return 수정된 댓글의 DTO
     * @throws IllegalArgumentException 댓글을 찾을 수 없거나 수정 권한이 없을 경우
     */
    @Transactional
    public CommentDTO updateComment(Long commentId, CommentDTO updatedCommentDto, User currentUser) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다: " + commentId));

        // 현재 로그인한 사용자가 댓글의 작성자와 일치하는지 확인하여 수정 권한을 검사합니다.
        if (!existingComment.getWriter().getUid().equals(currentUser.getUid())) {
            log.warn("댓글 수정 권한 없음: 댓글 작성자 UID={} vs 현재 사용자 UID={}", existingComment.getWriter().getUid(), currentUser.getUid());
            throw new IllegalArgumentException("이 댓글을 수정할 권한이 없습니다.");
        }

        // 댓글 내용 업데이트
        existingComment.setContent(updatedCommentDto.getContent());
        // 필요에 따라 updatedAt 필드를 추가하고 설정할 수 있습니다. (예: existingComment.setUpdatedAt(LocalDateTime.now());)

        Comment savedComment = commentRepository.save(existingComment);
        // 수정된 댓글 엔티티를 DTO로 변환하여 반환 (작성자 정보 포함)
        return toCommentDTO(savedComment);
    }

    /**
     * 댓글을 삭제합니다.
     *
     * @param commentId 삭제할 댓글의 ID
     * @param currentUser 현재 로그인한 사용자
     * @throws IllegalArgumentException 댓글을 찾을 수 없거나 삭제 권한이 없을 경우
     */
    @Transactional
    public void deleteComment(Long commentId, User currentUser) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다: " + commentId));

        // 현재 로그인한 사용자가 댓글의 작성자와 일치하는지 확인하여 삭제 권한을 검사합니다.
        if (!existingComment.getWriter().getUid().equals(currentUser.getUid())) {
            log.warn("댓글 삭제 권한 없음: 댓글 작성자 UID={} vs 현재 사용자 UID={}", existingComment.getWriter().getUid(), currentUser.getUid());
            throw new IllegalArgumentException("이 댓글을 삭제할 권한이 없습니다.");
        }

        commentRepository.delete(existingComment);
    }

    /**
     * Comment 엔티티를 CommentDTO로 변환하는 헬퍼 메서드.
     * 특히 작성자(User) 정보를 UserDTO로 정확하게 매핑합니다.
     *
     * @param comment 변환할 Comment 엔티티
     * @return 변환된 CommentDTO
     */
    private CommentDTO toCommentDTO(Comment comment) {
        if (comment == null) {
            return null;
        }

        // ModelMapper를 사용하여 Comment 엔티티의 기본 필드들을 CommentDTO로 매핑합니다.
        // 예를 들어 id, content, createdAt 등은 자동으로 매핑됩니다.
        CommentDTO commentDTO = modelMapper.map(comment, CommentDTO.class);

        // ⭐⭐⭐ 핵심 변경 사항: UserDTO.from() 헬퍼 메서드를 사용하여 작성자 정보 매핑 ⭐⭐⭐
        // Comment 엔티티의 'writer' 필드 (User 타입)를 CommentDTO의 'writer' 필드 (UserDTO 타입)로 변환합니다.
        if (comment.getWriter() != null) {
            commentDTO.setWriter(UserDTO.from(comment.getWriter()));
        }

        // CommentDTO에 boardId 필드가 있고 ModelMapper가 이를 자동으로 매핑하지 못하는 경우를 대비하여
        // 명시적으로 게시글 ID를 설정합니다.
        if (comment.getBoard() != null) {
            commentDTO.setBoardId(comment.getBoard().getId());
        }

        return commentDTO;
    }
}