package kr.co.J2SM.dto.Project;

import jakarta.persistence.*;
import kr.co.J2SM.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMemberDTO {

    private Long id;
    private ProjectDTO project;
    private String userId;
    private String role;
}

