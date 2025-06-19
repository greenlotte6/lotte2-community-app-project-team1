package kr.co.J2SM.controller;

import kr.co.J2SM.dto.Project.ProjectTaskDTO;
import kr.co.J2SM.service.ProjectTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
@RequiredArgsConstructor
public class ProjectTaskController {

    private final ProjectTaskService taskService;

    // 태스크 생성: POST /api/sections/{sectionId}/tasks
    @PostMapping("/{sectionId}/tasks")
    public ResponseEntity<ProjectTaskDTO> createTask(
            @PathVariable Long sectionId,
            @RequestBody ProjectTaskDTO dto
    ) {
        ProjectTaskDTO created = taskService.createTask(sectionId, dto);
        return ResponseEntity.ok(created);
    }

    // 태스크 리스트: GET /api/sections/{sectionId}/tasks
    @GetMapping("/{sectionId}/tasks")
    public ResponseEntity<List<ProjectTaskDTO>> getTasks(@PathVariable Long sectionId) {
        List<ProjectTaskDTO> list = taskService.getTasksBySection(sectionId);
        return ResponseEntity.ok(list);
    }

    // 태스크 수정: PUT /api/tasks/{taskId}
    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<ProjectTaskDTO> updateTask(
            @PathVariable Long taskId,
            @RequestBody ProjectTaskDTO dto
    ) {
        ProjectTaskDTO updated = taskService.updateTask(taskId, dto);
        return ResponseEntity.ok(updated);
    }

    // 태스크 삭제: DELETE /api/tasks/{taskId}
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }
}
