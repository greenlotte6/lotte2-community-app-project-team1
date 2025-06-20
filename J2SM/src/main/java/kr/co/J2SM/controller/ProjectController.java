package kr.co.J2SM.controller;

import kr.co.J2SM.dto.Project.ProjectDTO;
import kr.co.J2SM.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // 1. 프로젝트 생성
    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO dto) {
        ProjectDTO created = projectService.createProject(dto);
        return ResponseEntity.ok(created);
    }

    // 2. 내 프로젝트 리스트 조회 (userId는 파라미터/토큰 등 상황에 맞게)
    @GetMapping("/my")
    public ResponseEntity<List<ProjectDTO>> getMyProjects(@RequestParam String userId) {
        List<ProjectDTO> list = projectService.getProjectsByUser(userId);
        return ResponseEntity.ok(list);
    }

    // 3. 프로젝트 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectDetail(@PathVariable Long id) {
        ProjectDTO dto = projectService.getProjectDetail(id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectDTO dto
    ) {
        ProjectDTO updated = projectService.updateProject(id, dto);
        return ResponseEntity.ok(updated);
    }
}
