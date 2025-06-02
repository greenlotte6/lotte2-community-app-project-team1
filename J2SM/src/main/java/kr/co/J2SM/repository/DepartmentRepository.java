package kr.co.J2SM.repository;

import kr.co.J2SM.entity.Product;
import kr.co.J2SM.entity.company.Company;
import kr.co.J2SM.entity.company.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository  extends JpaRepository<Department, Integer> {
    List<Department> findByCompany(Company company);
}
