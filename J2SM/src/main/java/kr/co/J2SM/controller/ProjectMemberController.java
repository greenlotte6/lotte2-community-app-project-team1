package kr.co.J2SM.controller;

import kr.co.J2SM.dto.Project.ProjectMemberDTO;
import kr.co.J2SM.service.ProjectMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectMemberController {

    private final ProjectMemberService memberService;

    // 프로젝트 멤버 추가(초대): POST /api/projects/{projectId}/members
    @PostMapping("/{projectId}/members")
    public ResponseEntity<ProjectMemberDTO> addMember(
            @PathVariable Long projectId,
            @RequestParam String userUid,
            @RequestParam(defaultValue = "member") String role
    ) {
        ProjectMemberDTO added = memberService.addMember(projectId, userUid, role);
        return ResponseEntity.ok(added);
    }

    // 프로젝트 멤버 리스트: GET /api/projects/{projectId}/members
    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<ProjectMemberDTO>> getMembers(
            @PathVariable Long projectId
    ) {
        List<ProjectMemberDTO> list = memberService.getMembers(projectId);
        return ResponseEntity.ok(list);
    }

    // 프로젝트 멤버 강퇴: DELETE /api/projects/{projectId}/members/{userUid}
    @DeleteMapping("/{projectId}/members/{userUid}")
    public ResponseEntity<Void> removeMember(
            @PathVariable Long projectId,
            @PathVariable String userUid
    ) {
        memberService.removeMember(projectId, userUid);
        return ResponseEntity.ok().build();
    }

    // 권한 변경: PUT /api/projects/{projectId}/members/{memberId}/role
    @PutMapping("/{projectId}/members/{memberId}/role")
    public ResponseEntity<ProjectMemberDTO> updateRole(
            @PathVariable Long projectId,
            @PathVariable Long memberId,
            @RequestParam String newRole
    ) {
        ProjectMemberDTO updated = memberService.updateMemberRole(memberId, newRole);
        return ResponseEntity.ok(updated);
    }
}
