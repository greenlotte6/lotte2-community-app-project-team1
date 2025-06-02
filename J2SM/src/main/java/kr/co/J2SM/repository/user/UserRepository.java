package kr.co.J2SM.repository.user;

import kr.co.J2SM.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {


    Boolean existsByEmail(String email);
}
