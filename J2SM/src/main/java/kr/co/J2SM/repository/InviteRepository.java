package kr.co.J2SM.repository;

import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.entity.user.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InviteRepository  extends JpaRepository<Invite, Integer> {

}
