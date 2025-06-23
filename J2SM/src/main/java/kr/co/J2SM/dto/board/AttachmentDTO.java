// kr.co.J2SM.dto.board.AttachmentDTO.java
package kr.co.J2SM.dto.board;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttachmentDTO {
    private Long id;
    private String fileName;
    private String savedPath; // 클라이언트에는 보통 전체 경로 대신 파일명만 노출하지만, 다운로드 URL 생성에 필요할 수 있음
    private Long fileSize;
    private String fileType;
    private LocalDateTime uploadedAt;
    private Long boardId; // 어떤 게시글에 연결된 파일인지 (선택적)
}