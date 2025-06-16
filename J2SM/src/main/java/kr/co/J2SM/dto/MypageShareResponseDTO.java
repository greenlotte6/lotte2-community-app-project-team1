package kr.co.J2SM.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MypageShareResponseDTO {
    private Long id;               // 공유 이력 PK
    private Long mypageId;         // 공유된 페이지 PK
    private String targetUserId;   // 공유받은 사람 uid
    private String targetUserName; // 공유받은 사람 이름 (옵션)
    private String sharedBy;       // 공유한 사람 uid
    private String sharedByName;   // 공유한 사람 이름 (옵션)
    private LocalDateTime sharedAt;// 공유 시점
}
