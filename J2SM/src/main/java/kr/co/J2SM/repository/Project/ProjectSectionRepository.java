package kr.co.J2SM.repository.Project;

import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectSectionRepository extends JpaRepository<ProjectSection, Long> {
    List<ProjectSection> findByProject_IdOrderByOrderNumAsc(Long projectId);
}
