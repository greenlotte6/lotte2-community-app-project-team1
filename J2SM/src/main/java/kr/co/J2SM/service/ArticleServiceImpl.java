package kr.co.J2SM.service;

import kr.co.J2SM.dto.ArticleDTO;
import kr.co.J2SM.dto.PageRequestDTO;
import kr.co.J2SM.dto.PageResponseDTO;
import kr.co.J2SM.entity.Article;
import kr.co.J2SM.entity.User;
import kr.co.J2SM.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ModelMapper modelMapper;

    @Override
    public int register(ArticleDTO articleDTO){

        Article article = modelMapper.map(articleDTO, Article.class);

        User user = User.builder()
                    .uid(articleDTO.getWriter())
                    .build();

        article.setWriter(user);

        log.info(article);

        Article savedArticle = articleRepository.save(article);
        return savedArticle.getNo();
    }

    @Override
    public PageResponseDTO<ArticleDTO> list(PageRequestDTO pageRequestDTO) {


        log.info("pageRequestDTO : " + pageRequestDTO);

        Pageable pageable = PageRequest.of(
                        pageRequestDTO.getPg() - 1 ,  // 1페이지가 0이므로 주의
                        pageRequestDTO.getSize(),
                        Sort.by("no").descending());

        Page<Article> pageArticle = articleRepository.findByCate(pageRequestDTO.getCate(), pageable);

        List<ArticleDTO> dtoList = pageArticle.getContent().stream()
                .map(entity -> {
                    ArticleDTO dto = modelMapper.map(entity, ArticleDTO.class);
                    dto.setWriter(entity.getWriter().getNick());
                    return dto;
                })
                .toList();

        int total = (int) pageArticle.getTotalElements();

        PageResponseDTO<ArticleDTO> responseDTO = PageResponseDTO.<ArticleDTO>builder()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .total(total)
                .build();

        return responseDTO;
    }

    @Override
    public ArticleDTO get(int no) {

        Article article = articleRepository.findById(no).orElseThrow();

        ArticleDTO articleDTO = modelMapper.map(article, ArticleDTO.class);

        return articleDTO;
    }

    @Override
    public void modify(ArticleDTO articleDTO) {

    }

    @Override
    public void remove(int no) {

    }
}
