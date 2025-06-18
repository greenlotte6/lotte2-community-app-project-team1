package kr.co.J2SM.repository;

import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Integer> {
    Optional<Membership> findTopByCompanyOrderByPaymentIdDesc(Company company);
}
