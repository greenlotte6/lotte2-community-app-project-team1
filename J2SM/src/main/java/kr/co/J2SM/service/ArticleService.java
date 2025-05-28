package kr.co.J2SM.service;

import kr.co.J2SM.dto.ArticleDTO;
import kr.co.J2SM.dto.PageRequestDTO;
import kr.co.J2SM.dto.PageResponseDTO;

public interface ArticleService {

    public int register(ArticleDTO articleDTO);

    public PageResponseDTO<ArticleDTO> list(PageRequestDTO pageRequestDTO);
    public ArticleDTO get(int no);
    public void modify(ArticleDTO articleDTO);
    public void remove(int no);

}
