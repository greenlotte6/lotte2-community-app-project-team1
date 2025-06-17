package kr.co.J2SM.dto;

import kr.co.J2SM.entity.MypageShare;
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
    private String pageTitle;
    private String content;

    public static MypageShareResponseDTO fromEntity(MypageShare entity) {
        return MypageShareResponseDTO.builder()
                .id(entity.getId())
                .mypageId(entity.getMyPage().getId())
                .targetUserId(entity.getTargetUser().getUid())
                .targetUserName(entity.getTargetUser().getName())
                .sharedBy(entity.getSharedBy() != null ? entity.getSharedBy().getUid() : null)
                .sharedByName(entity.getSharedBy() != null ? entity.getSharedBy().getName() : null)
                .sharedAt(entity.getSharedAt())
                .pageTitle(entity.getMyPage().getTitle())
                .content(entity.getMyPage().getContent())
                // 필요시 여기에 myPage 제목 등 추가
                .build();
    }
}
