package kr.co.J2SM.entity.Project;

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
@Entity
@Table(name = "projectTask")
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sectionId")
    private ProjectSection section;

    private String content;
    private Integer orderNum;
    private Boolean isCompleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignedTo")
    private User assignedTo;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

