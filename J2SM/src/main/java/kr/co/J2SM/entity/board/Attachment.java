// kr.co.J2SM.entity.board.Attachment.java
package kr.co.J2SM.entity.board;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "attachment") // 파일 첨부 테이블명
@Getter
@Setter
@ToString(exclude = "board") // Board 엔티티와의 순환 참조 방지
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 게시글과 다대일 관계
    @JoinColumn(name = "board_id", nullable = false) // Board 엔티티의 ID를 참조
    private Board board; // 어떤 게시글에 첨부된 파일인지

    @Column(nullable = false)
    private String fileName; // 원본 파일명 (예: document.pdf)

    @Column(nullable = false, unique = true)
    private String savedPath; // 서버에 저장된 경로 및 파일명 (예: /uploads/uuid_document.pdf)

    @Column(nullable = false)
    private Long fileSize; // 파일 크기 (바이트)

    @Column(nullable = false)
    private String fileType; // 파일 MIME 타입 (예: application/pdf, image/jpeg)

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime uploadedAt; // 업로드 시간
}