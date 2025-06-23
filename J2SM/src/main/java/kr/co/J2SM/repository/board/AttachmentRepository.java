package kr.co.J2SM.repository.board;

import kr.co.J2SM.entity.board.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    List<Attachment> findByBoardId(Long boardId);
}
