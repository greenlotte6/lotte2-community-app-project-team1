package kr.co.J2SM.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MypageShareRequestDTO {
    private Long mypageId;               // 공유할 MyPage PK
    private List<String> targetUserIds;  // 공유받을 유저 uid 리스트
    private String sharedBy;             // 공유하는 사람 uid (필요 없으면 빼도 됨)
}
