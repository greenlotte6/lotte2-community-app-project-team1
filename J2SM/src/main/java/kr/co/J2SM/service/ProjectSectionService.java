package kr.co.J2SM.service;

import kr.co.J2SM.dto.Project.ProjectSectionDTO;
import kr.co.J2SM.dto.Project.ProjectSectionRequestDTO;
import kr.co.J2SM.dto.Project.ProjectTaskRequestDTO;
import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectSection;
import kr.co.J2SM.entity.Project.ProjectTask;
import kr.co.J2SM.repository.Project.ProjectRepository;
import kr.co.J2SM.repository.Project.ProjectSectionRepository;
import kr.co.J2SM.repository.Project.ProjectTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectSectionService {

    private final ProjectRepository projectRepository;
    private final ProjectSectionRepository sectionRepository;
    private final ProjectTaskRepository projectTaskRepository;

    // 섹션 생성
    public ProjectSectionDTO createSection(Long projectId, ProjectSectionDTO dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectSection section = ProjectSection.builder()
                .title(dto.getTitle())
                .orderNum(dto.getOrderNum())
                .project(project)
                .createdAt(LocalDateTime.now())
                .description(dto.getDescription())
                .name(dto.getName())
                .updatedAt(LocalDateTime.now())
                .build();
        ProjectSection saved = sectionRepository.save(section);

        return toDTO(saved);
    }

    // 특정 프로젝트의 섹션 리스트
    public List<ProjectSectionDTO> getSectionsByProject(Long projectId) {
        return sectionRepository.findByProject_IdOrderByOrderNumAsc(projectId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 섹션 수정
    public ProjectSectionDTO updateSection(Long sectionId, ProjectSectionDTO dto) {
        ProjectSection section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        section.setTitle(dto.getTitle());
        section.setOrderNum(dto.getOrderNum());
        section.setDescription(dto.getDescription());
        section.setName(dto.getName());
        section.setUpdatedAt(LocalDateTime.now());
        return toDTO(sectionRepository.save(section));
    }

    // 섹션 삭제
    public void deleteSection(Long sectionId) {
        sectionRepository.deleteById(sectionId);
    }

    // 엔티티 -> DTO 변환 함수
    private ProjectSectionDTO toDTO(ProjectSection section) {
        return ProjectSectionDTO.builder()
                .id(section.getId())
                .title(section.getTitle())
                .orderNum(section.getOrderNum())
                .projectId(section.getProject().getId())
                .createdAt(section.getCreatedAt())
                .description(section.getDescription())
                .name(section.getName())
                .updatedAt(section.getUpdatedAt())
                .build();
    }

    @Transactional
    public void saveSectionsBulk(Long projectId, List<ProjectSectionRequestDTO> sectionDTOs) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        // 기존 섹션/태스크 전체 삭제
        sectionRepository.deleteByProjectId(projectId);

        // 새로 저장
        int secOrder = 0;
        for (ProjectSectionRequestDTO sectionDTO : sectionDTOs) {
            ProjectSection section = ProjectSection.builder()
                    .title(sectionDTO.getTitle())
                    .orderNum(sectionDTO.getOrderNum() != null ? sectionDTO.getOrderNum() : secOrder++)
                    .project(project)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .description(sectionDTO.getDescription())
                    .name(sectionDTO.getName())
                    .build();
            section = sectionRepository.save(section);

            if (sectionDTO.getTasks() != null) {
                int taskOrder = 0;
                for (ProjectTaskRequestDTO taskDTO : sectionDTO.getTasks()) {
                    ProjectTask task = ProjectTask.builder()
                            .section(section)
                            .content(taskDTO.getContent())
                            .orderNum(taskDTO.getOrderNum() != null ? taskDTO.getOrderNum() : taskOrder++)
                            .isCompleted(taskDTO.getIsCompleted() != null ? taskDTO.getIsCompleted() : false)
                            .build();
                    projectTaskRepository.save(task);
                }
            }
        }
    }
}

