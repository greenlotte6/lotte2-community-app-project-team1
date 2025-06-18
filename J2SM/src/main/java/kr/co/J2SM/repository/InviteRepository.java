package kr.co.J2SM.repository;

import kr.co.J2SM.entity.company.Department;
import kr.co.J2SM.entity.user.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InviteRepository  extends JpaRepository<Invite, Integer> {

    Optional<Invite> findByInviteCode(String inviteCode);
}
