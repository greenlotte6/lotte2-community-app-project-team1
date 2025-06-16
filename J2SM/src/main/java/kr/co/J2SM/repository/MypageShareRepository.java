package kr.co.J2SM.repository;

import kr.co.J2SM.entity.MypageShare;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MypageShareRepository extends JpaRepository<MypageShare, Long> {
    List<MypageShare> findByTargetUser_Uid(String uid);
}
