package kr.co.J2SM.entity.drive;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recentDrive")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentDrive {

    @Id @GeneratedValue
    private Long id;

    private String userId;           // 로그인 유저
    private Long driveFileId;       // 드라이브 파일 ID
    private LocalDateTime viewedAt; // 본 시간
}


