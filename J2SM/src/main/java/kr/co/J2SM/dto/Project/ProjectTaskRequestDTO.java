package kr.co.J2SM.dto.Project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectTaskRequestDTO {

    private Long id;
    private String content;
    private Integer orderNum;
    private Boolean isCompleted;
    private Long assignedTo;
}
