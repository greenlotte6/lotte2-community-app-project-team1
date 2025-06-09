package kr.co.J2SM.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyPageDTO {

    private Long userId;
    private String content; // Editor.js의 JSON 데이터 (Stringified)
    private boolean isFavorite;
    private boolean shared;
}
