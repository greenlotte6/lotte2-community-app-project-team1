package kr.co.J2SM.controller;
import kr.co.J2SM.dto.Project.ProjectSectionDTO;
import kr.co.J2SM.service.ProjectSectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectSectionController {

    private final ProjectSectionService sectionService;

    // 섹션 생성: POST /api/projects/{projectId}/sections
    @PostMapping("/{projectId}/sections")
    public ResponseEntity<ProjectSectionDTO> createSection(
            @PathVariable Long projectId,
            @RequestBody ProjectSectionDTO dto
    ) {
        ProjectSectionDTO created = sectionService.createSection(projectId, dto);
        return ResponseEntity.ok(created);
    }

    // 섹션 리스트: GET /api/projects/{projectId}/sections
    @GetMapping("/{projectId}/sections")
    public ResponseEntity<List<ProjectSectionDTO>> getSections(
            @PathVariable Long projectId
    ) {
        List<ProjectSectionDTO> list = sectionService.getSectionsByProject(projectId);
        return ResponseEntity.ok(list);
    }

    // 섹션 수정: PUT /api/sections/{sectionId}
    @PutMapping("/sections/{sectionId}")
    public ResponseEntity<ProjectSectionDTO> updateSection(
            @PathVariable Long sectionId,
            @RequestBody ProjectSectionDTO dto
    ) {
        ProjectSectionDTO updated = sectionService.updateSection(sectionId, dto);
        return ResponseEntity.ok(updated);
    }

    // 섹션 삭제: DELETE /api/sections/{sectionId}
    @DeleteMapping("/sections/{sectionId}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long sectionId) {
        sectionService.deleteSection(sectionId);
        return ResponseEntity.ok().build();
    }
}