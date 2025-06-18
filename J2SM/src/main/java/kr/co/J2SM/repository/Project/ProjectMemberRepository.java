package kr.co.J2SM.repository.Project;

import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Integer> {
}
