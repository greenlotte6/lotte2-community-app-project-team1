package kr.co.J2SM.repository;

import kr.co.J2SM.entity.Terms;
import kr.co.J2SM.entity.inquire.TrialRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrialRequestRepository extends JpaRepository<TrialRequest, Integer> {
}
