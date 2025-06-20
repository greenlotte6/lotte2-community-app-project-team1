package kr.co.J2SM.mapper.drive;

import kr.co.J2SM.dto.drive.DriveDTO;
import kr.co.J2SM.entity.drive.Drive;

import java.time.format.DateTimeFormatter;

public class DriveMapper {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    public static DriveDTO toDTO(Drive entity) {
        return DriveDTO.builder()
                .id(entity.getId())
                .user(entity.getUser())
                .name(entity.getName())
                .type(entity.getType())
                .location(entity.getLocation())
                .date(entity.getUploadedAt().format(FORMATTER))
                .favorite(entity.isFavorite())
                .fileType(entity.getFileType())
                .filePath(entity.getFilePath())
                .originalFilename(entity.getOriginalFilename())
                .deleted(entity.isDeleted())
                .parentId(entity.getParent() != null ? entity.getParent().getId() : null) // ✅ 추가
                .build();
    }
}

