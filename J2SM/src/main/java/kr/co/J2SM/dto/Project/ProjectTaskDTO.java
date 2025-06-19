package kr.co.J2SM.dto.Project;

import jakarta.persistence.*;
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
public class ProjectTaskDTO {

    private Long id;
    private Long sectionId;
    private String content;
    private Integer orderNum;
    private Boolean isCompleted = false;
    private String assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

