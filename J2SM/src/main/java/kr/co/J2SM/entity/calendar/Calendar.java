package kr.co.J2SM.entity.calendar;


import jakarta.persistence.*;
import lombok.*;

@ToString
@Entity
@Table(name = "calendar")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false)
    private String start;

    @Column(nullable = false)
    private String end;

    private String place;
    private String member;
    private String note;
    private String color;
}
