package kr.co.J2SM.repository.company;

import kr.co.J2SM.entity.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository  extends JpaRepository<Company, Integer> {

}
