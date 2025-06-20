package kr.co.J2SM.dto.Project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectSectionRequestDTO {

    private Long id;
    private String title;
    private Integer orderNum;
    private String description;
    private String name;
    private List<ProjectTaskRequestDTO> tasks;
}
