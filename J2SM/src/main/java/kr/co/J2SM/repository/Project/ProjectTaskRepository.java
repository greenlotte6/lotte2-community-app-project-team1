package kr.co.J2SM.repository.Project;

import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Integer> {
}
