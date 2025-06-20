package kr.co.J2SM.repository.Project;

import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

}
