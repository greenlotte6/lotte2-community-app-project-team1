package kr.co.J2SM.service;

import kr.co.J2SM.dto.Project.ProjectMemberDTO;
import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectMember;
import kr.co.J2SM.entity.user.User;
import kr.co.J2SM.repository.Project.ProjectMemberRepository;
import kr.co.J2SM.repository.Project.ProjectRepository;
import kr.co.J2SM.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectMemberService {

    private final ProjectMemberRepository memberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // 프로젝트 멤버 초대(추가)
    public ProjectMemberDTO addMember(Long projectId, String userUid, String role) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(userUid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .role(role)
                .build();
        ProjectMember saved = memberRepository.save(member);
        return toDTO(saved);
    }

    // 프로젝트 멤버 목록
    public List<ProjectMemberDTO> getMembers(Long projectId) {
        return memberRepository.findByProject_Id(projectId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 프로젝트 멤버 삭제(강퇴)
    public void removeMember(Long projectId, String userUid) {
        memberRepository.deleteByProject_IdAndUser_Uid(projectId, userUid);
    }

    // 권한 변경
    public ProjectMemberDTO updateMemberRole(Long memberId, String newRole) {
        ProjectMember member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        member.setRole(newRole);
        return toDTO(memberRepository.save(member));
    }

    // 엔티티 → DTO 변환
    private ProjectMemberDTO toDTO(ProjectMember member) {
        return ProjectMemberDTO.builder()
                .id(member.getId())
                .projectId(member.getProject().getId())
                .userId(member.getUser().getUid())
                .role(member.getRole())
                .build();
    }
}
