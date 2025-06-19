package kr.co.J2SM.repository.board;

import jakarta.transaction.Transactional;
import kr.co.J2SM.entity.board.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시물 ID에 해당하는 모든 댓글을 찾기 위한 메서드
    List<Comment> findByBoard_IdOrderByCreatedAtAsc(Long boardId);

    @Transactional
    void deleteByBoard_Id(Long boardId);
}
