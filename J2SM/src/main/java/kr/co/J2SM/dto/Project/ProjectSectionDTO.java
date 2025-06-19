package kr.co.J2SM.dto.Project;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectSectionDTO {

    private Long id;
    private String title;
    private Integer orderNum;
    private Long projectId;
    private LocalDateTime createdAt;
    private String description;
    private String name;
    private LocalDateTime updatedAt;
    private Long createdBy;
}

