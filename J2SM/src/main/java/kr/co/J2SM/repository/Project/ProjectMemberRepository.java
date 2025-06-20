package kr.co.J2SM.repository.Project;

import kr.co.J2SM.entity.Project.Project;
import kr.co.J2SM.entity.Project.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    List<ProjectMember> findByUser_Uid(String uid);
    List<ProjectMember> findByProject_Id(Long projectId);
    void deleteByProject_IdAndUser_Uid(Long projectId, String uid);

    @Query("SELECT pm FROM ProjectMember pm JOIN FETCH pm.project WHERE pm.user.uid = :userId")
    List<ProjectMember> findByUserUidWithProject(@Param("userId") String userId);

}
