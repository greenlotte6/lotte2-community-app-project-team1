package kr.co.J2SM.repository;

import jakarta.transaction.Transactional;
import kr.co.J2SM.entity.MyPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MyPageRepository extends JpaRepository<MyPage, Long> {
    @Query("SELECT p FROM MyPage p WHERE p.isDeleted = false")
    List<MyPage> findAllActive();

    @Query("SELECT p FROM MyPage p WHERE p.isDeleted = true")
    List<MyPage> findAllTrashed();

    @Modifying
    @Transactional
    @Query("UPDATE MyPage p SET p.isDeleted = true WHERE p.id = :id")
    void softDelete(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE MyPage p SET p.isDeleted = false WHERE p.id = :id")
    void restore(@Param("id") Long id);

    // MyPageRepository.java
    @Query("SELECT p FROM MyPage p WHERE p.isDeleted = false AND p.user.uid = :userId")
    List<MyPage> findAllActiveByUser(@Param("userId") String userId);

    @Query("SELECT p FROM MyPage p WHERE p.isDeleted = true AND p.user.uid = :userId")
    List<MyPage> findAllTrashedByUser(@Param("userId") String userId);
}
