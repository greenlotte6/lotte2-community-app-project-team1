package kr.co.J2SM.service;

import kr.co.J2SM.dto.Project.ProjectTaskDTO;
import kr.co.J2SM.entity.Project.ProjectSection;
import kr.co.J2SM.entity.Project.ProjectTask;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.Project.ProjectSectionRepository;
import kr.co.J2SM.repository.Project.ProjectTaskRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectTaskService {

    private final ProjectTaskRepository taskRepository;
    private final ProjectSectionRepository sectionRepository;
    private final UserRepository userRepository;

    // 태스크 생성
    public ProjectTaskDTO createTask(Long sectionId, ProjectTaskDTO dto) {
        ProjectSection section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        User assignedTo = null;
        if (dto.getAssignedTo() != null) {
            assignedTo = userRepository.findById(dto.getAssignedTo())
                    .orElse(null);
        }

        ProjectTask task = ProjectTask.builder()
                .section(section)
                .content(dto.getContent())
                .orderNum(dto.getOrderNum())
                .isCompleted(dto.getIsCompleted() != null ? dto.getIsCompleted() : false)
                .assignedTo(assignedTo)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        ProjectTask saved = taskRepository.save(task);
        return toDTO(saved);
    }

    // 섹션별 태스크 목록
    public List<ProjectTaskDTO> getTasksBySection(Long sectionId) {
        return taskRepository.findBySection_IdOrderByOrderNumAsc(sectionId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 태스크 수정
    public ProjectTaskDTO updateTask(Long taskId, ProjectTaskDTO dto) {
        ProjectTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setContent(dto.getContent());
        task.setOrderNum(dto.getOrderNum());
        task.setIsCompleted(dto.getIsCompleted());
        if (dto.getAssignedTo() != null) {
            User assignedTo = userRepository.findById(dto.getAssignedTo())
                    .orElse(null);
            task.setAssignedTo(assignedTo);
        }
        task.setUpdatedAt(LocalDateTime.now());

        return toDTO(taskRepository.save(task));
    }

    // 태스크 삭제
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    // 엔티티 -> DTO 변환
    private ProjectTaskDTO toDTO(ProjectTask task) {
        return ProjectTaskDTO.builder()
                .id(task.getId())
                .sectionId(task.getSection().getId())
                .content(task.getContent())
                .orderNum(task.getOrderNum())
                .isCompleted(task.getIsCompleted())
                .assignedTo(task.getAssignedTo() != null ? task.getAssignedTo().getUid() : null)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
