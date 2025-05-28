package kr.co.J2SM.repository;

import kr.co.J2SM.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    public Page<Article> findByCate(String cate, Pageable pageable);



}
