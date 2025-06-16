package kr.co.J2SM.repository.user;

import kr.co.J2SM.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {


    Boolean existsByEmail(String email);

    boolean existsByHp(String hp);


    Optional<User> findByHp(String hp);

    Optional<User> findByEmail(String email);

    //Optional<Object> findByUid(String uid); 안써서 잠시 주석처리

    Optional<User> findByUid(String uid);

}
