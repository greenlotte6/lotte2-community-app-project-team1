package kr.co.J2SM.repository.board;

import io.lettuce.core.dynamic.annotation.Param;
import kr.co.J2SM.entity.board.Board;
import kr.co.J2SM.entity.board.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {


    @Query("SELECT b FROM Board b WHERE b.category.company.id = :companyId")
    List<Board> findByCompanyId(@Param("companyId") Long companyId);

    void deleteByCategory(Category category);

    List<Board> findByCategory(Category category);
}
