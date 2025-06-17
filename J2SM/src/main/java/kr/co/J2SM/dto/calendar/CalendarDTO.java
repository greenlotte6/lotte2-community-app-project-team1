package kr.co.J2SM.dto.calendar;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CalendarDTO {
    private Long id;
    private String title;
    private String start;
    private String end;
    private String place;
    private String member;
    private String note;
    private String color;
    private int company;
    private int isPublic;

    private String cate; // 개인, 공용 구분
}
