package kr.co.J2SM.service;

import kr.co.J2SM.dto.Project.ProjectDTO;
import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectMember;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.Project.ProjectMemberRepository;
import kr.co.J2SM.repository.Project.ProjectRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;


    // 1. 프로젝트 생성
    public ProjectDTO createProject(ProjectDTO dto) {
        User user = userRepository.findById(dto.getCreatedBy())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Project entity = Project.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .createdBy(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Project saved = projectRepository.save(entity);

        // 프로젝트 생성시 본인을 멤버에 자동 추가
        ProjectMember member = ProjectMember.builder()
                .project(saved)
                .user(user)
                .role("admin")
                .build();
        projectMemberRepository.save(member);

        return ProjectDTO.builder()
                .id(saved.getId())
                .name(saved.getName())
                .description(saved.getDescription())
                .createdBy(saved.getCreatedBy().getUid())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    // 2. 내 프로젝트 전체 조회
    public List<ProjectDTO> getProjectsByUser(String userId) {
        return projectMemberRepository.findByUserUidWithProject(userId).stream()
                .map(pm -> {
                    Project p = pm.getProject();
                    return ProjectDTO.builder()
                            .id(p.getId())
                            .name(p.getName())
                            .description(p.getDescription())
                            .createdBy(p.getCreatedBy() != null ? p.getCreatedBy().getUid() : null)
                            .createdAt(p.getCreatedAt())
                            .updatedAt(p.getUpdatedAt())
                            .build();
                })
                .collect(Collectors.toList());
    }

    // 3. 프로젝트 상세 조회
    public ProjectDTO getProjectDetail(Long projectId) {
        Project p = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return ProjectDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .createdBy(p.getCreatedBy() != null ? p.getCreatedBy().getUid() : null)
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }

    @Transactional
    public void deleteProject(Long projectId) {
        // 존재 체크 (Optional)
        if (!projectRepository.existsById(projectId)) {
            throw new RuntimeException("Project not found: " + projectId);
        }
        projectRepository.deleteById(projectId);
    }

    @Transactional
    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        // 필드 값 수정 (원하는 필드만)
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());

        // updatedAt 등 갱신 필요하면
        project.setUpdatedAt(java.time.LocalDateTime.now());

        // 저장 (JPA는 트랜잭션 내에서 알아서 merge)
        // projectRepository.save(project); // 생략 가능

        // 엔티티 → DTO 변환해서 반환 (toDto 메서드 등 필요)
        return ProjectDTO.fromEntity(project);
    }
}

