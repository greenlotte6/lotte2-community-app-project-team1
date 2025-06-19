package kr.co.J2SM.repository.board;

import kr.co.J2SM.entity.board.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    // 특정 게시글에 속한 첨부 파일 목록 조회
    List<Attachment> findByBoard_Id(Long boardId);

}