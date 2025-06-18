package kr.co.J2SM.repository;

import kr.co.J2SM.entity.Product;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository  extends JpaRepository<Department, Integer> {
    List<Department> findByCompany(Company company);

    List<Department> findByCompany_CompanyName(String companyName);

    @Query("SELECT d FROM Department d LEFT JOIN FETCH d.users WHERE d.company.companyName = :companyName")
    List<Department> findAllWithUsersByCompanyName(@Param("companyName") String companyName);

    Optional<Department> findByCompanyAndDepartmentName(Company company, String department);
}
