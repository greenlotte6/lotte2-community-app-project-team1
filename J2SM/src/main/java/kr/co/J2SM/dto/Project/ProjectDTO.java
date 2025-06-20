package kr.co.J2SM.dto.Project;

import jakarta.persistence.*;
import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {

    private Long id;
    private String name;
    private String description;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ProjectDTO fromEntity(Project entity) {
        return ProjectDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                // ... 기타 필드 세팅
                .build();
    }

}

