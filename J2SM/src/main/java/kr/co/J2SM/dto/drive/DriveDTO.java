package kr.co.J2SM.dto.drive;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DriveDTO {
    private Long id;
    private String user;
    private String name;
    private String type;
    private String location;
    private String date;              // uploadedAt을 yyyy.MM.dd 형태로 가공
    private boolean favorite;
    private String fileType;
    private String filePath;         // 서버 파일 경로 (다운로드에 사용)
    private String originalFilename;
    private boolean deleted;
}
