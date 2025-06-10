package kr.co.J2SM.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import kr.co.J2SM.entity.MyPage;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyPageDTO {

    private Long id;
    private String userId;
    private String content; // Editor.js의 JSON 데이터 (Stringified)
    private boolean isFavorite;
    private boolean shared;
    private String title;

    @JsonProperty("isDeleted")
    private boolean isDeleted;

    public static MyPageDTO fromEntity(MyPage entity) {
        return MyPageDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .isFavorite(entity.isFavorite())
                .shared(entity.isShared())
                .isDeleted(entity.isDeleted()) // ✅ 여기 필수
                .userId(entity.getUser() != null ? entity.getUser().getUid() : null)
                .build();
    }
}
