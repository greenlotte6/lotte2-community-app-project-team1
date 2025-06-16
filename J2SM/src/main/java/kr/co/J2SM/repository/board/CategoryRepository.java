package kr.co.J2SM.repository.board;

import kr.co.J2SM.entity.board.Category;
import kr.co.J2SM.entity.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByCompany(Company company);
}
